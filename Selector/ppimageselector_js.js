// PPImageSelector jQuery Plugin
// This plugin replaces standard image-based answer options with a custom interactive thumbnail UI.
// Supports SR (single response) or MR (multi response), optional DK (Don't Know) and OE (Other Specify) options,
// with optional labels and zoom popup functionality.

(function($) {
  $.fn.PPImageSelector = function(options) {
    // Default plugin settings
    const settings = $.extend({
      qtype: 'MR',         // Question type: 'SR' (single) or 'MR' (multiple)
      withDK: 0,           // 1 if "None of the above" or exclusive option is included
      withOE: '',          // Comma-separated OE codes to identify OE text fields
      withLabel: 0,        // 1 to show image labels
      popup: 0             // 1 to enable image zoom popups	  
    }, options);

    // Parse OE codes into array
    // We split the comma-separated string, trim each code, and filter out any empty (falsy) values
    const oeCodes = settings.withOE
      .split(',')
      .map(code => code.trim())
      .filter(Boolean);

    return this.each(function() {
      // Initialize container and loading indicator
      const $answersList = $(this).hide();
      const inputType = settings.qtype === 'SR' ? 'radio' : 'checkbox';
      const $imageSelector = $('<div class="PP_imageselector" role="list" style="display: none;"></div>');
      const $preloader = $('<div class="pp-loader">Loading thumbnails…</div>');
      $answersList.before($preloader);
      const imagePromises = [];

      // Loop through each answer element and build thumbnails
      $answersList.find('.element').each(function() {
        const $element = $(this);
        const $img = $element.find('img.survey_image').first();
        const $input = $element.find(`input[type="${inputType}"]`);
        const id = $input.attr('id');
        const code = id?.replace(/.*\./, ''); // Extract only last part of ID (e.g., 19 from ans4397.0.19)
        const $textInput = $element.find('input[type="text"]');
        const labelText = $element.find('label').clone().children('a, br').remove().end().text().trim();
        const isDK = settings.withDK == 1 && $input.hasClass('exclusive');
        const dataCell = $textInput.attr('data-cell') || '';
        const matchedCode = dataCell.split('_').pop();
        const isOE = oeCodes.includes(matchedCode);

        if (!code) return;

        const $thumb = $(`<div class="pp-thumbnail" data-code="${code}" role="listitem" tabindex="0" aria-label="${labelText}"></div>`);

        // Handle DK or OE entries or entries without an image
        if (isOE || isDK || !$img.length) {
          $thumb.append(`<div class="pp-label-only" title="${labelText}">${labelText}</div>`);

          // Attach OE text input if applicable
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
          // Normal image-based options
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

        // Add label or tooltip
        if (settings.withLabel == 1 && !isDK && !isOE && $img.length) {
          $thumb.append(`<div class="pp-label">${labelText}</div>`);
        } else if (!isDK && !isOE && $img.length) {
          $thumb.attr('title', labelText);
        }

        // Insert thumbnail to selector container
        $imageSelector.append($thumb);

        // Main click and keyboard event logic
        $thumb.on('click keypress', function(e) {
          // Prevent space/enter from triggering when typing in an input/textarea
          if (e.type === 'keypress') {
            if ($(e.target).is('input, textarea')) return;
            if (e.key !== 'Enter' && e.key !== ' ') return;
          }

          if ($(e.target).hasClass('pp-plus')) return;

          const isSelected = $thumb.hasClass('selected');

          if (settings.qtype === 'SR') {
            // Clear all selections for SR
            $imageSelector.find('.pp-thumbnail').removeClass('selected');
            $imageSelector.find('.pp-check').hide();
            $answersList.find(`input[type="${inputType}"]`).prop('checked', false);
            $imageSelector.find('.pp-oe-input').val('');
            $answersList.find('input[type="text"]').val('');
          }

          if (!isSelected) {
            if (isDK || (settings.qtype === 'MR' && $answersList.find('input.exclusive:checked').length)) {
              // Clear all selections if DK or exclusive already checked
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
            // Deselect option
            $thumb.removeClass('selected');
            $thumb.find('.pp-check').hide();
            $input.prop('checked', false);

            if (isOE && !$textInput.val().trim()) {
              $textInput.val('');
              $thumb.find('input.pp-oe-input').val('');
            }
          }
        });

        // Reflect existing selections on load
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

        // Sync DOM changes if toggled outside plugin
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

      // Once all images are loaded, show the selector UI
      Promise.all(imagePromises).then(() => {
        $preloader.remove();
        $answersList.before($imageSelector);
        $imageSelector.fadeIn(300);
      });
    });
  };
})(jQuery);
