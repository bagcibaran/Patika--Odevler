let buttonDOM = document.querySelector("#liveToastBtn");
let listDOM = document.querySelector("#list");
const toastDOM = document.querySelector("#liveToast");
const toastRecejtDOM = document.querySelector("#liveToastReject");
let option = {
  animation: true,
  delay: 2000,
};

let dizi = [];

if (localStorage.getItem("dizi") != null) {
  dizi = JSON.parse(localStorage.getItem("dizi"));
}

function showItem() {
  for (let index = 0; index < dizi.length; index++) {
    let liDOM = document.createElement("li");

    liDOM.innerHTML = `${dizi[index].task}  <div class="close">
    <button class="btn-close"></button>
    </div>`;

    if (dizi[index].isFinised) {
      liDOM.classList.add("checked");
    }

    listDOM.appendChild(liDOM);
  }
}

showItem();

console.log(dizi);

buttonDOM.addEventListener("click", () => {
  const inputDOM = document.querySelector("#task");

  if (inputDOM.value == "") {
    console.log("ekleme yapilamaz");
    const toast = new bootstrap.Toast(toastRecejtDOM, option);
    toast.show();
  } else {
    newElement(inputDOM.value);
    let nesne = { task: inputDOM.value, isFinised: false };
    console.log(nesne);
    dizi.push(nesne);
    localStorage.setItem("dizi", JSON.stringify(dizi));
    inputDOM.value = "";
    const toast = new bootstrap.Toast(toastDOM, option);
    toast.show();
  }
});

const newElement = (task) => {
  let liDOM = document.createElement("li");

  liDOM.innerHTML = `${task}  <div class="close">
    <button class="btn-close"></button>
    </div>`;

  listDOM.appendChild(liDOM);
  deleteElement();
  checkItem();
};

function checkItem() {
  let lis = document.querySelectorAll("li");
  for (let index = 0; index < lis.length; index++) {
    lis[index].addEventListener("click", function () {
      this.classList.toggle("checked");
      if (this.classList.contains("checked")) {
        dizi[index].isFinised = true;
      } else {
        dizi[index].isFinised = false;
      }
      localStorage.setItem("dizi", JSON.stringify(dizi));
    });
  }
}

function deleteElement() {
  let lis = document.querySelectorAll("li");
  for (let index = 0; index < lis.length; index++) {
    lis[index].querySelector("button").addEventListener("click", function () {
      this.closest("li").remove();
    });
  }
}

deleteElement();
checkItem();
