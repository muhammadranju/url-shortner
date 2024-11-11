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
