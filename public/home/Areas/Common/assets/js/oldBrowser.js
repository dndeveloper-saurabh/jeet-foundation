// Written to work in IE11

// making this work in storybook
document.addEventListener("DOMContentLoaded", function () {
  var mount = document.querySelector(".js-old-browser-modal");
  if (!mount) {
    return;
  }

  var displayValue = getComputedStyle(mount, null).display;

  // show modal
  if (displayValue !== "none") {
    mount.querySelector(".js-modal").classList.add("is-open");

    var closeButton = document.querySelector(".js-modal-close");
    closeButton.addEventListener("click", function () {
      // hide modal
      mount.querySelector(".js-modal").classList.remove("is-open");
    });
  }
});
