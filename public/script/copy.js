$(document).ready(function () {
  "use strict";

  $(window).keydown(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
  });

  $.fn.shortlink({
    // ajax: 'https://short.php8developer.com/ajax/short',
    // siteUrl: 'https://short.php8developer.com',
    qr: "#qr",
    copy: "#copy",
    shortlink: "#shortlink",
    url: "#url",
    create: "#create",
    form: "#shortForm",
    shortarea: "#short-area",
    notice: "#copy-notice",
    share: ".share42init",
  });
});

window.openModal = function (modalId) {
  document.getElementById(modalId).style.display = "block";
  document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
};

window.closeModal = function (modalId) {
  document.getElementById(modalId).style.display = "none";
  document
    .getElementsByTagName("body")[0]
    .classList.remove("overflow-y-hidden");
};

// Close all modals when press ESC
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode === 27) {
    document
      .getElementsByTagName("body")[0]
      .classList.remove("overflow-y-hidden");
    let modals = document.getElementsByClassName("modal");
    Array.prototype.slice.call(modals).forEach((i) => {
      i.style.display = "none";
    });
  }
};
