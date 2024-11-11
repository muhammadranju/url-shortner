const longURL = document.getElementById("longURL");
const shortArea = document.getElementById("short-area");
const shortLink = document.getElementById("shortlink");
const loading = document.getElementById("loading");

document.getElementById("create").addEventListener("click", async () => {
  shortArea.classList.add("hidden");
  loading.classList.remove("hidden");
  if (longURL.value.length === 0) {
    alert("Please enter a valid URL");
    loading.classList.add("hidden");
    return;
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
      longURL.value = "";
      loading.classList.add("hidden");
      return alert(data.message);
    }

    if (data.status === 201) {
      shortArea.classList.remove("hidden");
      loading.classList.add("hidden");
      shortLink.value = data?.links?.shortURL;
    }
    console.log(data);
  } else {
    return alert("Please enter a valid URL");
  }
});
