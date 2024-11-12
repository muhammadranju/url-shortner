const longURL = document.getElementById("longURL");
const shortArea = document.getElementById("short-area");
const shortLink = document.getElementById("shortlink");
const loading = document.getElementById("loading");
const previousShortened = document.getElementById("previousShortened");
const previousShortValue = document.getElementById("previousShortValue");
const errorMsg = document.getElementById("errorMsg");

document.getElementById("create").addEventListener("click", async () => {
  shortArea.classList.add("hidden");
  previousShortened.classList.add("hidden");
  loading.classList.remove("hidden");
  if (longURL.value.length === 0) {
    errorMsg.innerText = "Please enter a valid URL";
    loading.classList.add("hidden");
    return openModal("modelConfirm");
  }
  if (longURL.value.length !== 0) {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        longURL: longURL.value,
      }),
    });
    const data = await response.json();

    if (!data.success) {
      if (data.existingLink.success) {
        loading.classList.add("hidden");
        previousShortened.classList.remove("hidden");
        loading.classList.add("hidden");
        previousShortValue.value = data.existingLink.url;
        // return alert(data.existingLink.url);
      }
      longURL.value = "";
      loading.classList.add("hidden");
      errorMsg.innerText = data.message;
      return openModal("modelConfirm");
      // return alert(data.message);
    }
    // if (data.existingLink.success) {
    //   console.log(data);
    //   longURL.value = "";
    //   loading.classList.add("hidden");
    //   return alert(data.message);
    // }

    if (data.status === 201) {
      longURL.value = "";
      shortArea.classList.remove("hidden");
      loading.classList.add("hidden");
      shortLink.value = data?.links?.shortURL;
    }
    console.log(data);
  } else {
    errorMsg.innerText = "Please enter a valid URL";
    return openModal("modelConfirm");
    return alert("Please enter a valid URL");
  }
});
