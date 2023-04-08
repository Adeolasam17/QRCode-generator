const Form = document.getElementById("generate-code");
const qr = document.getElementById("qrcode");
const container = document.querySelector(".container");

function GenerateCode(event) {
  event.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;
  const Spinner = document.querySelector(".hide");

  if (url === "") {
    alert("Please Enter A URL!");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();

      generateQrCode(url,size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }

  function showSpinner() {
    return Spinner.classList.add("show-spin");
  }

  function hideSpinner() {
    return Spinner.classList.remove("show-spin");
  }

  function generateQrCode(url, size) {
    const qrCode = new QRCode("qrcode", {
      text: url,
      width: size,
      height: size,
    });
  }

  function clearUI() {
    qr.innerHTML = "";
    const saveBtn = document.getElementById("save-link");
    if (saveBtn) {
      saveBtn.remove();
    }
  }

  function createSaveBtn(saveUrl) {
    const link = document.createElement("a");
    link.id = "save-link";
    link.classList.add("show-link");
    link.href = saveUrl;
    link.download = "qrcode";
    link.innerHTML = "Save QRCode";
    container.appendChild(link);
  }
}

Form.addEventListener("submit", GenerateCode);
