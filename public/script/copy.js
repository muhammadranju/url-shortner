// $(document).ready(function () {
//   "use strict";

//   $(window).keydown(function (event) {
//     if (event.keyCode === 13) {
//       event.preventDefault();
//       return false;
//     }
//   });

//   $.fn.shortlink({
//     // ajax: 'https://short.php8developer.com/ajax/short',
//     // siteUrl: 'https://short.php8developer.com',
//     qr: "#qr",
//     copy: "#copy",
//     shortlink: "#shortlink",
//     url: "#url",
//     create: "#create",
//     form: "#shortForm",
//     shortarea: "#short-area",
//     notice: "#copy-notice",
//     share: ".share42init",
//   });
// });

function copyToClipboard() {
  const copyAlert = document.getElementById("copyAlert");
  // Get the text field
  const previousShortValue = document.getElementById("previousShortValue");
  console.log(copyAlert);
  // Select the text field
  previousShortValue.select();
  previousShortValue.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(previousShortValue.value).then(
    function () {
      copyAlert.classList.remove("hidden");
      setTimeout(() => {
        copyAlert.classList.add("hidden");
      }, 1000);
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
}
function copyToClipboard2() {
  const copyAlert2 = document.getElementById("copyAlert2");
  // Get the text field
  const shortLink = document.getElementById("shortlink");
  // Select the text field
  shortLink.select();
  shortLink.setSelectionRange(0, 99999); // For mobile devices
  // Copy the text inside the text field
  navigator.clipboard.writeText(shortLink.value).then(
    function () {
      copyAlert2.classList.remove("hidden");
      setTimeout(() => {
        copyAlert2.classList.add("hidden");
      }, 1000);
    },
    function (err) {
      console.error("Could not copy text: ", err);
    }
  );
}
