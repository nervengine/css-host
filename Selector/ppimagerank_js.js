(function ($) {
  $.fn.PPImageRank = function (options) {
    const settings = $.extend({
      minRank: 1,
      maxRank: null,
      withOE: null,
      withDK: null,
      withLabel: 0,
      popup: 0,
      enableReset: false
    }, options);

    return this.each(function () {
      const $container = $(this);
      const $elements = $container.find(".element");

      // Utility: Get question ID (e.g. from div#question_QX → QX)
	  const getQuestionId = () => $container.closest('form').find('[id^="question_"]').attr('id')?.split('question_')[1] || '';
	  const qId = getQuestionId();

      const $preloader = $('<div class="pp-preloader">Loading thumbnails...</div>').insertBefore($container);
      const $thumbWrapper = $('<div class="PP_imagerank" role="list"></div>');
      const $errorBox = $('<div class="pp-error"></div>').insertBefore($thumbWrapper);
	  const $btnContinue = $('#btn_continue');

      let rankOrder = [];

      $container.hide();
      $thumbWrapper.insertAfter($preloader);

      // Preload all images from .survey_image and prepare thumbnail generation
      const imagePromises = [];
      $elements.each(function () {
        const $img = $(this).find("img.survey_image");
        if ($img.length) {
          const img = new Image();
          img.src = $img.attr("src");
          imagePromises.push(new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          }));
        }
      });

      Promise.all(imagePromises).then(() => {
        $elements.each(function () {
          const $el = $(this);

          // Skip OE thumbnail here; it's added separately below
          if (settings.withOE) {
            const $input = $el.find('[data-cell$="' + qId + '_' + settings.withOE + '"]');
            if ($input.length) return;
          }

          // Skip DK thumbnail here; it's added separately below
          if (settings.withDK) {
            const $dk = $el.find('input[type="checkbox"][id$="' + qId + '.' + settings.withDK + '"]');
            if ($dk.length) return;
          }

          const $img = $el.find("img.survey_image");
          const $select = $el.find("select");
          const id = $select.attr('id');
          const code = id?.replace(/.*\./, '');
          const labelText = $el.find("label").clone().children().remove().end().text().trim();

          const $thumb = $('<div class="pp-thumbnail" data-code="' + code + '" role="listitem" tabindex="0" aria-label="' + labelText + '"></div>');
          const $imgClone = $img.clone().removeAttr("id");

          if (settings.popup && $img.length) {
            $thumb.append('<a data-fancybox href="' + $img.attr('src') + '" class="pp-icon pp-plus" aria-label="Zoom image">+</a>');
          }

          if ($img.length) {
            $thumb.append($imgClone);
          }

          if (settings.withLabel) {
            $thumb.append('<div class="pp-label">' + labelText + '</div>');
          }

          $thumb.data("select", $select);

          // Handle click or keyboard interaction on thumbnail
          $thumb.on("click keypress", function (e) {
            if ($(e.target).hasClass('pp-plus')) return;
			if (isActivateEvent(e)) {
              e.preventDefault();
              handleRank($thumb);
            }
          });

          $thumbWrapper.append($thumb);
        });

        // Add OE thumbnail if configured
        if (settings.withOE) {
          const $oeInput = $('[data-cell$="' + qId + '_' + settings.withOE + '"]');
          const $oeWrap = $oeInput.closest(".element");
          const $oeSelect = $oeWrap.find("select");

          if ($oeInput.length && $oeSelect.length) {
            const labelText = $oeWrap.find("label").text().trim();
            const $thumb = $('<div class="pp-thumbnail pp-oe" data-code="' + settings.withOE + '" role="listitem" tabindex="0" aria-label="' + labelText + '"></div>');

            $thumb.append('<div class="pp-label">' + labelText + '</div>');
            $thumb.append($oeInput);

            $thumb.data("select", $oeSelect);
            $thumb.data("input", $oeInput);

            $thumb.on("click keypress", function (e) {
			  if (isActivateEvent(e)) {
                e.preventDefault();
                $oeInput.focus();
                if ($oeInput.val().trim()) {
                  handleRank($thumb);
                }
              }
            });

            $oeInput.on("input", function () {
              if (!$thumb.hasClass("ranked") && $(this).val().trim()) {
                handleRank($thumb);
              } else if (!$(this).val().trim()) {
                unrankThumb($thumb);
              }
            });

            $thumbWrapper.append($thumb);
          }
        }

        // Add reset button if enabled
        let $resetBtn;
        if (settings.enableReset) {
		  const $oeInput = $('[data-cell$="' + qId + '_' + settings.withOE + '"]');
          
		  $resetBtn = $('<div class="pp-controls"><button type="button" class="pp-reset">Reset</button></div>');
          $resetBtn.insertAfter($thumbWrapper);

		  $('.pp-reset').on('click', function () {
		    const $textInput = $('input[type="text"]');
		  
		    if ($textInput.length) {
				$textInput.prop('disabled', false);
		    }
		  });
        }

        // Add DK checkbox support if enabled
        if (settings.withDK) {
          const $dk = $('input[type="checkbox"][id$="' + qId + '.' + settings.withDK + '"]');
          const $dkElement = $dk.closest('.element');
          if ($dkElement.length && $resetBtn) {
            const $dkWrapper = $('<div class="pp-dk"></div>').append($dkElement);
			$dkWrapper.insertBefore($resetBtn);
          }

		  $('.pp-dk').on('click', function () {
		    const $checkInput = $('input[type="checkbox"]');
		  
		    if ($checkInput.length) {
				$checkInput.prop('disabled', false);
		    }
		  });

        }

        $preloader.remove();
        $thumbWrapper.show();
		validateMinRank();
      });

	  // Click or keyboard interaction on thumbnail
	  function isActivateEvent(e) {
	  	return e.type === 'click' || (e.type === 'keypress' && (e.which === 13 || e.which === 32));
	  }

      function handleRank($thumb) {
        if ($thumb.hasClass("ranked")) {
          unrankThumb($thumb);
        }
		else {
          if (settings.maxRank && rankOrder.length >= settings.maxRank) {
            showError("You can only select up to " + settings.maxRank + " items.");
            return;
          }

          hideError();
          rankOrder = rankOrder.filter(t => t !== $thumb);
          rankOrder.push($thumb);
          updateRanks();
        }

        if (settings.withDK) handleDKAutoToggle();
		validateMinRank();
      }

      function unrankThumb($thumb) {
        $thumb.removeClass("ranked").find(".pp-badge").remove();
        $thumb.data("select").val("-1");
        rankOrder = rankOrder.filter(t => t !== $thumb);
        updateRanks();
		validateMinRank();
      }

      function updateRanks() {
        $thumbWrapper.find(".pp-thumbnail").removeClass("ranked").find(".pp-badge").remove();
        rankOrder.forEach(function ($thumb, i) {
          $thumb.addClass("ranked").append('<div class="pp-badge">' + (i + 1) + '</div>');
          $thumb.data("select").val(i);
        });
		
		/*
		const $textInput = $('input[type="text"]');
		if ($textInput.length && rankOrder.length >= settings.maxRank) {
			$textInput.prop('disabled', true);
		}
		else {
			$textInput.prop('disabled', false);
		}
		*/
      }

      function showError(message) {
        alert("You can only rank up to " + settings.maxRank + " items.");
		//$errorBox.text(message).fadeIn();
        //setTimeout(hideError, 3000);
      }

      function hideError() {
        $errorBox.hide().text("");
      }

	  function validateMinRank() {
	    if (!$btnContinue.length) return;
	    
	    const $dk = settings.withDK ? $("input[type='checkbox'][id*='" + settings.withDK + "']") : null;
	    const isDKChecked = $dk?.is(":checked");
	  
	    if (isDKChecked || rankOrder.length >= settings.minRank) {
	  	$btnContinue.show();
	    } else {
	  	$btnContinue.hide();
	    }
	  }

      function handleDKAutoToggle() {
        const $dk = $("input[type='checkbox'][id*='" + settings.withDK + "']");
        if (!$dk.length) return;
		if (rankOrder.length > 0) {
          $dk.prop("checked", false);
          enableAllInputs();
        }
      }

      function enableAllInputs() {
        $elements.find("select, input").prop("disabled", false);
        $thumbWrapper.find(".pp-thumbnail").removeClass("disabled");
      }

      function disableAllInputs() {
        $elements.find("select, input").prop("disabled", true);
        $thumbWrapper.find(".pp-thumbnail").addClass("disabled");
      }

      if (settings.withDK) {
        const $dk = $("input[type='checkbox'][id*='" + settings.withDK + "']");
        $dk.on("change", function () {
          if ($(this).is(":checked")) {
            disableAllInputs();
            rankOrder = [];
            updateRanks();
            $elements.find("select").val("-1");
            if (settings.withOE) $('[data-cell$="' + qId + '_' + settings.withOE + '"]').val("");
			validateMinRank();
          } else {
            enableAllInputs();
			validateMinRank();
          }
        });
      }

      $(document).on("click", ".pp-reset", function () {
        rankOrder = [];
        updateRanks();
        $elements.find("select").val("-1");
        if (settings.withOE) $('[data-cell$="' + qId + '_' + settings.withOE + '"]').val("");
        if (settings.withDK) $("input[type='checkbox'][id*='" + settings.withDK + "']").prop("checked", false);
        enableAllInputs();
        hideError();
		validateMinRank();
      });
    });
  };
})(jQuery);
