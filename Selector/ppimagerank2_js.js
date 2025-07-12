(function ($) {
  $.fn.PPImageRank = function (options) {
    // ⛭ Merge user options with defaults
    const settings = $.extend({
      minRank: 1,
      maxRank: null,
      withOE: null,
      withDK: null,
      withLabel: 0,
      popup: 0,
      enableReset: false,
      debounceDelay: 300
    }, options);

    // 🔁 Debounce utility to limit rapid input events
    function debounce(fn, delay) {
      let timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), delay);
      };
    }

    // 🔃 Iterate on each matched DOM element to initialize
    return this.each(function () {
      const $container = $(this);
      const $elements = $container.find(".element");

      // 🆔 Utility: Extract question ID (e.g., QX from div#question_QX)
      const getQuestionId = () =>
        $container.closest('form')
          .find('[id^="question_"]')
          .attr('id')
          ?.split('question_')[1] || '';
      const qId = getQuestionId();

      // 💡 Pre-injected DOM elements
      const $preloader = $('<div class="pp-preloader" aria-live="polite">Loading thumbnails…</div>').insertBefore($container);
      const $thumbWrapper = $('<div class="PP_imagerank" role="list"></div>');
      const $errorBox = $('<div class="pp-error" aria-live="assertive" style="display:none;"></div>').insertBefore($thumbWrapper);
      const $btnContinue = $('#btn_continue');

      let rankOrder = []; // 🧮 Keeps track of current ranked order

      // 🔒 Hide original UI and prepare custom ranking UI
      $container.hide();
      $thumbWrapper.insertAfter($preloader);

      // 🔁 Preload all images asynchronously
      const imagePromises = [];
      $elements.each(function () {
        const $img = $(this).find("img.survey_image");
        if ($img.length) {
          const img = new Image();
          img.src = $img.attr("src");
          imagePromises.push(new Promise(resolve => {
            img.onload = resolve;
            img.onerror = () => {
              console.warn("Image failed to load:", img.src);
              resolve(); // Proceed anyway
            };
          }));
        }
      });

      // ✅ After all images are preloaded, render thumbnails
      Promise.all(imagePromises).then(() => {
        $elements.each(function () {
          const $el = $(this);

          // ❌ Skip OE and DK items (added later)
          if (settings.withOE && $el.find('[data-cell$="' + qId + '_' + settings.withOE + '"]').length) return;
          if (settings.withDK && $el.find('input[type="checkbox"][id$="' + qId + '.' + settings.withDK + '"]').length) return;

          const $img = $el.find("img.survey_image");
          const $select = $el.find("select");
          if (!$select.length) return;

          const id = $select.attr('id');
          if (!id) return;

          const code = id.replace(/.*\./, '');
          const labelText = $el.find("label").clone().children().remove().end().text().trim();

          // 📸 Build thumbnail block
          const $thumb = $('<div class="pp-thumbnail" data-code="' + code + '" role="listitem" tabindex="0" aria-label="' + labelText + '" aria-pressed="false"></div>');
          const $imgClone = $img.clone().removeAttr("id");

          if (settings.popup && $img.length) {
            $thumb.append('<a data-fancybox href="' + $img.attr('src') + '" class="pp-icon pp-plus" aria-label="Zoom image">+</a>');
          }
          if ($img.length) $thumb.append($imgClone);
          if (settings.withLabel) $thumb.append('<div class="pp-label">' + labelText + '</div>');

          $thumb.data("select", $select);

          // 🖱️ Handle click + keyboard interactions
          $thumb.on("click keypress", function (e) {
            if ($(e.target).hasClass('pp-plus')) return;
            if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
              e.preventDefault();
              handleRank($thumb);
            }
          });

          $thumbWrapper.append($thumb);
        });

        // 💬 Add Open Ended (OE) input as thumbnail if applicable
        if (settings.withOE) {
          const $oeInput = $('[data-cell$="' + qId + '_' + settings.withOE + '"]');
          if ($oeInput.length) {
            const $oeWrap = $oeInput.closest(".element");
            const $oeSelect = $oeWrap.find("select");
            if ($oeSelect.length) {
              const labelText = $oeWrap.find("label").text().trim();
              const $thumb = $('<div class="pp-thumbnail pp-oe" data-code="' + settings.withOE + '" role="listitem" tabindex="0" aria-label="' + labelText + '" aria-pressed="false"></div>');
              $thumb.append('<div class="pp-label">' + labelText + '</div>');
              $thumb.append($oeInput);

              $thumb.data("select", $oeSelect);
              $thumb.data("input", $oeInput);

              $thumb.on("click keypress", function (e) {
                if (e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32))) {
                  e.preventDefault();
                  $oeInput.focus();
                  if ($oeInput.val().trim()) handleRank($thumb);
                }
              });

              // ⌨️ Debounced input listener
              $oeInput.on("input", debounce(function () {
                const val = $(this).val().trim();
                if (val && !$thumb.hasClass("ranked")) {
                  handleRank($thumb);
                } else if (!val && $thumb.hasClass("ranked")) {
                  unrankThumb($thumb);
                }
              }, settings.debounceDelay));

              $thumbWrapper.append($thumb);
            }
          }
        }

        // 🔁 Reset control block
        let $resetBtn;
        if (settings.enableReset) {
          $resetBtn = $('<div class="pp-controls"><button type="button" class="pp-reset">Reset</button></div>').insertAfter($thumbWrapper);
        }

        // ✅ Add Don't Know (DK) checkbox if applicable
        if (settings.withDK) {
          const $dk = getDKCheckbox();
          if ($dk.length && $resetBtn) {
            const $dkElem = $dk.closest('.element');
            const $dkWrapper = $('<div class="pp-dk"></div>').append($dkElem);
            $dkWrapper.insertBefore($resetBtn);
          }
        }

        // ✅ Done loading
        $preloader.remove();
        $thumbWrapper.show();
        validateMinRank(); // Check if we can allow continuation
      });

      // 🔄 Get the DK checkbox (helper)
      function getDKCheckbox() {
        return settings.withDK ? $("input[type='checkbox'][id*='" + settings.withDK + "']") : $();
      }

      // 🏅 Rank/Unrank logic
      function handleRank($thumb) {
        hideError();
        if ($thumb.hasClass("ranked")) {
          unrankThumb($thumb);
        } else {
          if (settings.maxRank && rankOrder.length >= settings.maxRank) {
            showError("You can only select up to " + settings.maxRank + " items.");
            return;
          }
          rankOrder = rankOrder.filter(t => t[0] !== $thumb[0]);
          rankOrder.push($thumb);
          updateRanks();
        }
        if (settings.withDK) handleDKAutoToggle();
        validateMinRank();
      }

      // 🚫 Unrank a thumbnail
      function unrankThumb($thumb) {
        $thumb.removeClass("ranked").attr('aria-pressed','false').find(".pp-badge").remove();
        $thumb.data("select").val("-1");
        rankOrder = rankOrder.filter(t => t[0] !== $thumb[0]);
        updateRanks();
        validateMinRank();
      }

      // 🔁 Refresh badge display + select values
      function updateRanks() {
        $thumbWrapper.find(".pp-thumbnail")
          .removeClass("ranked")
          .attr('aria-pressed','false')
          .find(".pp-badge").remove();

        rankOrder.forEach(($thumb, i) => {
          $thumb.addClass("ranked")
            .attr('aria-pressed','true')
            .append('<div class="pp-badge">' + (i + 1) + '</div>');
          $thumb.data("select").val(i);
        });
      }

      // ⚠️ Show and hide messages
      function showError(message) {
        alert("You can only rank up to " + settings.maxRank + " items.");
		//$errorBox.text(message).show();
      }

      function hideError() {
        $errorBox.hide().text("");
      }

      // ✅ Enable or disable Continue based on min rank or DK
      function validateMinRank() {
        if (!$btnContinue.length) return;
        const $dk = getDKCheckbox();
        const isDKChecked = $dk.is(":checked");
        if (isDKChecked || rankOrder.length >= settings.minRank) {
          $btnContinue.show();
        } else {
          $btnContinue.hide();
        }
      }

      // 🔁 Automatically uncheck DK if something is selected
      function handleDKAutoToggle() {
        const $dk = getDKCheckbox();
        if (!$dk.length) return;
        if (rankOrder.length > 0) {
          $dk.prop("checked", false);
          enableAllInputs();
        }
      }

      // 🟢 Enable/Disable state control
      function enableAllInputs() {
        $elements.find("select, input").prop("disabled", false);
        $thumbWrapper.find(".pp-thumbnail").removeClass("disabled");
      }

      function disableAllInputs() {
        $elements.find("select, input").prop("disabled", true);
        if (settings.withOE) $('[data-cell$="' + qId + '_' + settings.withOE + '"]').prop("disabled", false);
        $thumbWrapper.find(".pp-thumbnail").addClass("disabled");
      }

      // 🔘 DK checkbox toggle: disable everything or restore
      if (settings.withDK) {
        const $dk = getDKCheckbox();
        $dk.on("change", function () {
          if ($(this).is(":checked")) {
            disableAllInputs();
            rankOrder = [];
            updateRanks();
            $elements.find("select").val("-1");
            if (settings.withOE) $('[data-cell$="' + qId + '_' + settings.withOE + '"]').val("");
          } else {
            enableAllInputs();
          }
          validateMinRank();
        });
      }

      // 🔁 Global reset logic
      $(document).on("click", ".pp-reset", function () {
        rankOrder = [];
        updateRanks();
        $elements.find("select").val("-1");
        if (settings.withOE) $('[data-cell$="' + qId + '_' + settings.withOE + '"]').val("");
        if (settings.withDK) getDKCheckbox().prop("checked", false);
        enableAllInputs();
        hideError();
        validateMinRank();
      });
    });
  };
})(jQuery);
