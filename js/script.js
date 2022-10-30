import Api from "./api.js";

let user = document.cookie;
console.log("u", user);
if(!user) {
    user = prompt("Пользователь не найден, укажите имя пользователя", "yozline");
    document.cookie = `user=${user}`;
} else {
    user = user.split("=")[1]
}

var api = new Api(user);


const container = document.querySelector(".container");
const btn = document.querySelector(".sidebar").firstElementChild;
const popupList = document.querySelectorAll(".popup");
const popBox = document.querySelector(".popup-wrapper");
const deleteCard = document.querySelector(".delete");
const editbtn = document.querySelector(".edit");

deleteCard.addEventListener("click", function(e) {
    console.log("dataset.id: "+deleteCard.dataset.id)
    deletedCard(api, deleteCard.dataset.id);
});

console.log(getCatsList());

const addForm = document.forms.add;
addForm.addEventListener("submit", function(e) {
    console.log(getCatsList());
    addCat(e, api, Array.from(popupList), getCatsList());
});


const editForm = document.forms.edit;
editForm.addEventListener("submit", function(e) {
    console.log(getCatsList());
    updCat(e, api, editbtn.dataset.id);
});

if(!getCatsList()) {
    api.getCats()
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.message === "ok") {
            localStorage.setItem("cats", JSON.stringify(data.data));
            data.data.forEach(cat => {
                createCard(api, cat, container, Array.from(popupList));
            });
        } else {
            showPopup(api, Array.from(popupList), "info", data.message);
        }
    });
} else {
    getCatsList().forEach(cat => {
        createCard(api, cat,container, Array.from(popupList));
    });
}

editbtn.addEventListener("click", e => {
    popupList.forEach(p => {
            p.classList.remove("active");
    });
    showPopup(api, Array.from(popupList), "edit");
});

btn.addEventListener("click", e => {
    showPopup(api, Array.from(popupList), "add");
});



popupList.forEach(p => {
    p.firstElementChild.addEventListener("click", e => {
        p.classList.remove("active");
        popBox.classList.remove("active");
    });
});

popBox.addEventListener("click", function(e) {
    if (e.target === this) {
        popBox.classList.remove("active");
        popupList.forEach(p => {
            if (p.classList.contains("active")) {
                p.classList.remove("active");
            }
        })
    }
});