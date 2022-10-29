import Api from "./api.js";
var api = new Api("yozline");


const content = document.querySelector(".content");

let catsList = localStorage.getItem("cats");
if(catsList) {
    catsList = JSON.parse(catsList);
}
console.log(catsList);


if(!catsList) {
    api.getCats()
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data.message === "ok") {
            localStorage.setItem("cats", JSON.stringify(data.data));
            data.data.forEach(cat => {
                createCard(cat, content);
            });
        } else {
            showPopup(Array.from(popupList), "info", data.message);
        }
        // showPopup(Array.from(popupList), "info", data.message);
    });
} else {
    catsList.forEach(cat => {
        createCard(cat,content);
    });
}