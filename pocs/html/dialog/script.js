const dialog = document.getElementById("demoDialog");
const openModalBtn = document.getElementById("openModal");
const openNonModalBtn = document.getElementById("openNonModal");

if (typeof dialog.showModal !== "function") {
  alert("Your browser does not fully support <dialog>.");
}

openModalBtn.addEventListener("click", () => {
  dialog.showModal();
});

openNonModalBtn.addEventListener("click", () => {
  dialog.show();
});

dialog.addEventListener("close", () => {
  console.log("Dialog result:", dialog.returnValue);
});
