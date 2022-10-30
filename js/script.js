import Api from "./api.js";

let user = document.cookie;
console.log("u", user);
if(!user) {
    user = prompt("Пользователь не найден, укажите имя пользователя", "yozline");
    document.cookie = `user=${user}`;
    localStorage.removeItem('cats');
    location.reload();
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
    addCat(e, api, Array.from(popupList), getCatsList());
});


const editForm = document.forms.edit;
editForm.addEventListener("submit", function(e) {
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
    showPopup(api, Array.from(popupList), "edit", editbtn.dataset.id);
});

btn.addEventListener("click", e => {
    showPopup(api, Array.from(popupList), "add");
});



popupList.forEach(p => {
    p.firstElementChild.addEventListener("click", e => {
        p.classList.remove("active");
        popBox.classList.remove("active");
        let input1 = document.getElementById("e1");
        input1.value = "";
        let input2 = document.getElementById("e2");
        input2.value = "";
        let input3 = document.getElementById("e3");
        input3.value = ""
        let input4 = document.getElementById("e4");
        input4.value = 0;
        let input5 = document.getElementById("e5");
        input5.checked = 0;
        let input6 = document.getElementById("e6");
        input6.value = "";
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
        let input1 = document.getElementById("e1");
        input1.value = "";
        let input2 = document.getElementById("e2");
        input2.value = "";
        let input3 = document.getElementById("e3");
        input3.value = ""
        let input4 = document.getElementById("e4");
        input4.value = 0;
        let input5 = document.getElementById("e5");
        input5.checked = 0;
        let input6 = document.getElementById("e6");
        input6.value = "";
    }
});