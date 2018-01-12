function showModal (dialog, ifNotSupportedCallback) {
    if (dialog.showModal) {
        dialog.showModal();
    } else {
        if (ifNotSupportedCallback) {
            ifNotSupportedCallback();
        }
    }
}

function setUpDialog (dialogSelector, showDialogButtonSelector, buttons) {
    var dialog = document.querySelector(dialogSelector);
    var form   = dialog.querySelector("form");

    if (showDialogButtonSelector) {
        var showDialogButton = document.querySelector(showDialogButtonSelector);
        showDialogButton.addEventListener('click', function () {
            if (form) {
                form.reset();
            }

            showModal(dialog, function () {
                alert("Sorry, this feature is not supported in your browser. Download a more modern browser to use this feature.")
            });
        });
    }

    for (var i = 0; i < buttons.length; i++) {
        (function (button, form) {
            if (button && button.selector) {
                dialog.querySelector(button.selector)
                      .addEventListener('click', function () {
                          if (button.isTerminal) {
                              dialog.close();
                          }
                          if (button.callback) {
                              button.callback(dialog, form);
                          }
                      });
            }
        })(buttons[i], form);
    }
}

function showErrorDialogIfPresent () {
    var errorDialog = document.querySelector("#error-dialog");

    if (errorDialog) {
        setUpDialog("#error-dialog", null, [{
            selector: ".close", isTerminal: true
        }]);

        showModal(errorDialog);
    }
}

window.onload = function () {

    setUpDialog('#add-album-dialog', '#add-album-button', [{
        selector: ".close", isTerminal: true
    }, {
        selector: ".add-button", isTerminal: false/*callback: function (dialog, form) {
            // form.submit()
        }*/
    }]);

    setUpDialog('#add-artist-dialog', '#add-artist-button', [{
        selector: ".close", isTerminal: true
    }, {
        selector: ".add-button", isTerminal: false/*callback: function (dialog, form) {
            // form.submit()
        }*/
    }]);

    showErrorDialogIfPresent();

    var trackNames = document.querySelectorAll(".add_tracks");
    for (var i = 1; i <= trackNames.length; i++) {
        (function (i) {
            var trackNameInput     = document.querySelector("#tracks_" + i);
            var trackLengthInput   = document.querySelector("#track_length_" + i);
            var textChangeListener = function () {
                if (trackNameInput && trackLengthInput) {
                    var nextRowParent = document.querySelector("#add_track_" + (i + 1));
                    if ((trackNameInput.value && trackNameInput.value.length > 0) || (trackNameInput.value && trackLengthInput.value.length > 0)) {
                        trackNameInput.setAttribute("required", true);
                        trackLengthInput.setAttribute("required", true);
                    } else {
                        trackNameInput.removeAttribute("required");
                        trackLengthInput.removeAttribute("required");
                    }
                    if ((trackNameInput.value && trackNameInput.value.length > 0) && (trackNameInput.value && trackLengthInput.value.length > 0)) {
                        nextRowParent.removeAttribute("hidden");
                    } else {
                        nextRowParent.setAttribute("hidden", true);
                    }
                }
            };
            trackNameInput.addEventListener('input', textChangeListener);
            trackLengthInput.addEventListener('input', textChangeListener);
        })(i);
    }
};