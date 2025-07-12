// PPImageSelector jQuery Plugin
(function($) {
  $.fn.PPImageSelector = function(options) {
    // --- Default Settings ---
    const settings = $.extend({
      qtype: 'MR',          // 'MR' or 'SR'
      withDK: 0,            // 1 to enable "Don't know" logic
      withOE: '',           // OE code suffix (e.g., 'r98')
      popup: 0,             // 1 to enable image popup
      withLabel: 0          // 1 to show label under image
    }, options);

    const oeCode = settings.withOE.trim();

    return this.each(function() {
      const $answersList = $(this).hide();
      const $imageSelector = $('<div class="PP_imageselector" role="list" style="display: none;"></div>');
      const inputType = settings.qtype === 'SR' ? 'radio' : 'checkbox';

      // --- Preloader ---
      const $preloader = $('<div class="pp-loader">Loading thumbnails…</div>');
      $answersList.before($preloader);

      const imagePromises = [];

      // --- Build Thumbnails ---
      $answersList.find('.element').each(function() {
        const $element = $(this);
        const $img = $element.find('img.survey_image').first();
        const $input = $element.find(`input[type="${inputType}"]`);
        const id = $input.length ? $input.attr('id') : $element.find('select').attr('id');
        const code = id?.split('.').pop();
        const $textInput = $element.find('input[type="text"]');
        const labelText = $element.find('label').clone().children('a, br').remove().end().text().trim();
        const isDK = settings.withDK == 1 && $input.hasClass('exclusive');
        const isOE = $textInput.length > 0 && $textInput.attr('data-cell')?.endsWith(oeCode);
        if (!code) return;

        const $thumb = $(`<div class="pp-thumbnail" data-code="${code}" role="listitem" tabindex="0" aria-label="${labelText}"></div>`);

        // --- DK / OE / No Image ---
        if (isOE || isDK || !$img.length) {
          $thumb.append(`<div class="pp-label-only" title="${labelText}">${labelText}</div>`);

          if (isOE && $textInput.length) {
            const $inputField = $(`<input type="text" class="pp-oe-input" placeholder="Please specify...">`).val($textInput.val());

            if ($inputField.val().trim()) {
              $thumb.addClass('selected').append('<span class="pp-icon pp-check">✓</span>');
              $input.prop('checked', true);
            }

            $inputField.on('input', function () {
              const val = $(this).val();
              $textInput.val(val);
              if (val.trim()) {
                $thumb.addClass('selected');
                if (!$thumb.find('.pp-check').length) {
                  $thumb.append('<span class="pp-icon pp-check">✓</span>');
                } else {
                  $thumb.find('.pp-check').show();
                }
                $input.prop('checked', true);
              } else {
                $thumb.removeClass('selected');
                $thumb.find('.pp-check').remove();
                $input.prop('checked', false);
              }
            });

            $thumb.append($inputField);
          }
        } else {
          // --- Standard Image Thumbnail ---
          const img = new Image();
          img.src = $img.attr('src');
          imagePromises.push(new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          }));

          $thumb.append(`<img src="${img.src}" alt="${labelText}" />`);

          if (settings.popup == 1) {
            $thumb.append(`<a data-fancybox href="${img.src}" class="pp-icon pp-plus" aria-label="Zoom image">+</a>`);
          }

          $thumb.append('<span class="pp-icon pp-check" style="display:none">✓</span>');
        }

        // --- Add Labels or Tooltip ---
        if (settings.withLabel == 1 && !isDK && !isOE && $img.length) {
          $thumb.append(`<div class="pp-label">${labelText}</div>`);
        } else if (!isDK && !isOE && $img.length) {
          $thumb.attr('title', labelText);
        }

        $imageSelector.append($thumb);

        // --- Thumbnail Click Behavior ---
        $thumb.on('click keypress', function(e) {
          if (e.type === 'keypress' && e.key !== 'Enter' && e.key !== ' ') return;
          if ($(e.target).hasClass('pp-plus')) return;

          const isSelected = $thumb.hasClass('selected');

          if (settings.qtype === 'SR') {
            $imageSelector.find('.pp-thumbnail').removeClass('selected');
            $imageSelector.find('.pp-check').hide();
            $answersList.find(`input[type="${inputType}"]`).prop('checked', false);
            $imageSelector.find('.pp-oe-input').val('');
            $answersList.find('input[type="text"]').val('');
          }

          if (!isSelected) {
            if (isDK || (settings.qtype === 'MR' && $answersList.find('input.exclusive:checked').length)) {
              $imageSelector.find('.pp-thumbnail').removeClass('selected');
              $imageSelector.find('.pp-check').hide();
              $answersList.find(`input[type="${inputType}"]`).prop('checked', false);
              $imageSelector.find('.pp-oe-input').val('');
              $answersList.find('input[type="text"]').val('');
            }

            const existingOEText = isOE ? $textInput.val().trim() : '';
            if (!isOE || existingOEText) {
              $thumb.addClass('selected');
              if (!$thumb.find('.pp-check').length) {
                $thumb.append('<span class="pp-icon pp-check">✓</span>');
              } else {
                $thumb.find('.pp-check').show();
              }
              $input.prop('checked', true);
            }

            if (isOE && $textInput.length) {
              $thumb.find('input.pp-oe-input').focus();
            }
          } else {
            $thumb.removeClass('selected');
            $thumb.find('.pp-check').hide();
            $input.prop('checked', false);

            if (isOE && !$textInput.val().trim()) {
              $textInput.val('');
              $thumb.find('input.pp-oe-input').val('');
            }
          }
        });

        // --- Initialize Pre-Selected Input ---
        if ($input.prop('checked')) {
          const oeText = isOE ? $textInput.val().trim() : '';
          if (!isOE || oeText) {
            $thumb.addClass('selected');
            if (!$thumb.find('.pp-check').length) {
              $thumb.append('<span class="pp-icon pp-check">✓</span>');
            } else {
              $thumb.find('.pp-check').show();
            }
          }
        }

        // --- Sync Checkmarks on Input Change ---
        $input.on('change', function() {
          if ($input.prop('checked')) {
            const oeText = isOE ? $textInput.val().trim() : '';
            if (!isOE || oeText) {
              $thumb.addClass('selected');
              if (!$thumb.find('.pp-check').length) {
                $thumb.append('<span class="pp-icon pp-check">✓</span>');
              } else {
                $thumb.find('.pp-check').show();
              }
            }
          } else {
            $thumb.removeClass('selected');
            $thumb.find('.pp-check').hide();

            if (isOE && !$textInput.val().trim()) {
              $textInput.val('');
              $thumb.find('input.pp-oe-input').val('');
            }

            if ($input.hasClass('exclusive')) {
              $imageSelector.find('.pp-oe-input').val('');
              $answersList.find('input[type="text"]').val('');
            }
          }
        });
      });

      // --- Finalize ---
      Promise.all(imagePromises).then(() => {
        $preloader.remove();
        $answersList.before($imageSelector);
        $answersList.hide();
        $imageSelector.fadeIn(300);
      });
    });
  };
})(jQuery);
