const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

const deletedCard = (api, id) => {
    api.delCat(id)
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            if(data.message === "ok") {
                localStorage.removeItem('cats');
                location.reload();
                document.querySelector(".popup-wrapper").classList.remove("active");
            }
        })
}

const createCard = (api, data, parent, arr) => {
    const card = document.createElement("div");
    card.className = "card";
    // card.setAttribute("data-id", data.id);
    card.dataset.id = data.id;

    const age = document.createElement("div");
    age.className = "age";
    age.innerText = data.age || "-";

    const rate = document.createElement("div"); 
    rate.className = "rate";
    let stars = 5;
    let starsRate = data.rate;

    // <i class="fa-solid fa-star-half-stroke"></i> //полузакрашенная
    // <i class="fa-regular fa-star"></i> //пустая
    // <i class="fa-solid fa-star"></i> //закрашенная
    
    
    if(data.rate > 5) data.rate = 5;

    if(data.rate > 0) {
        let i = 0;
        while(i < data.rate-1){
            i++;
            rate.innerHTML += `<i class="fa-solid fa-star"></i>`;
           // rate.innerText = f(data.rate);
            
        }

        if(f(data.rate) > 0) rate.innerHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
        else rate.innerHTML += `<i class="fa-solid fa-star"></i>`;

        let difference = 5 - Math.ceil(data.rate);
        if(difference > 0) {
            let j = 0;
            while(j < difference) {
                j++;
                rate.innerHTML += `<i class="fa-regular fa-star"></i>`;
            }
        }
    }
    else rate.innerHTML = `<i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>`;

    const pic = document.createElement("div");
    pic.className = "pic";
    pic.style.backgroundImage = `url(${data.img_link || "https://avatanplus.com/files/resources/mid/5c133ffd531c3167ab31f59c.png"})`;

    const name = document.createElement("div");
    name.className = "name";
    name.innerText = data.name;

    const favourite = document.createElement("div");
    favourite.className = "favourite";
    if(data.favourite) favourite.innerHTML = `<i class="fa-solid fa-heart"></i>`;

    card.append(pic, age, rate, name,favourite);
    
    card.addEventListener("click", function() {
        console.log("arr: "+arr);
        showPopup(api, arr, "card", data);
    });

    parent.append(card);
}

const showPopup = (api, list, type, content) => {
    console.log("list: "+list); 
    let el = list.filter(el => el.dataset.type === type)[0];
    console.log(el);
    switch (type) {
        case "card": 
        {
            const parent = document.querySelector(".content");
            let elems;
            elems = document.querySelector(".picPopup");
            if(elems) elems.remove();
            elems = document.querySelector(".namePopup");
            if(elems) elems.remove();
            elems = document.querySelector(".descriptionPopup");
            if(elems) elems.remove();
            elems = document.querySelector(".agePopup");
            if(elems) elems.remove();
            elems = document.querySelector(".ratePopup");
            if(elems) elems.remove();
            elems = document.querySelector(".favouritePopup");
            if(elems) elems.remove();

            
            const pic = document.createElement("div");
            pic.className = "picPopup";
            pic.style.backgroundImage = `url(${content.img_link || "https://avatanplus.com/files/resources/mid/5c133ffd531c3167ab31f59c.png"})`;

            const description = document.createElement("div");
            description.className = "descriptionPopup";
            description.innerText = content.description || "Описание отсутствует";
        
            const name = document.createElement("div");
            name.className = "namePopup";
            name.innerText = content.name;
        
            const age = document.createElement("div");
            age.className = "agePopup";
            age.innerText = "Возраст: "+content.age;

            const rate = document.createElement("div");
            rate.className = "ratePopup";
            rate.innerText = "Рейтинг: "+content.rate;

            const favourite = document.createElement("div");
            let string = ""
            favourite.className = "favouritePopup";
            if(content.favourite) string = "да";
            else string = "нет";
            favourite.innerText = "Любимчик: "+string;

            parent.append(pic,  name, age, rate, favourite, description);
            
            const deleteCard = document.querySelector(".delete");
            deleteCard.dataset.id = content.id;

            const editCard = document.querySelector(".edit");
            editCard.dataset.id = content.id;


        }
        case "info":
            {
                let elems;
                elems = document.querySelector(".errorPopup");
                if(elems) elems.remove();

                const parent = document.querySelector(".error");

                const error = document.createElement("div");
                error.className = "errorPopup";
                error.innerText = content;
                console.log(content);

                parent.append(error);
            }
        // case "form":
        case "edit":
            { 
                api.getCat(content)
                    .then(res => res.json())
                    .then(data => {
                        console.log("data.message: "+data.message);
                        if(data.message === "ok") {
                            console.log(data);
                            let input1 = document.getElementById("e1");
                            input1.value = data.data.name;
                            let input2 = document.getElementById("e2");
                            input2.value = data.data.img_link;
                            let input3 = document.getElementById("e3");
                            input3.value = data.data.age;
                            let input4 = document.getElementById("e4");
                            input4.value = data.data.rate;
                            let input5 = document.getElementById("e5");
                            input5.checked = data.data.favourite;
                            let input6 = document.getElementById("e6");
                            input6.value = data.data.description;
                        }
                        // else { 
                        //     popupList.forEach(p => {
                        //             p.classList.remove("active");
                        //     });
                        //     showPopup(api, popupList, "info", data.message);
                        // }
                    })
            }
                
                // console.log(infoCat);

    }   
    el.classList.add("active");
    el.parentElement.classList.add("active");
}

const addCat = (e, api, popupList, store) => {
    e.preventDefault();
    let body = {};
    for(let i = 0; i < e.target.elements.length; i++) {
        let el = e.target.elements[i];
        if(el.name) {
            if(el.type === "checkbox") {
                body[el.name] = el.checked;
            } else if(el.value) {
                body[el.name] = el.value;
            }
        }
    }
    
    api.addCat(body)
        .then(res => res.json())
        .then(data => {
            console.log("data.message: "+data.message);
            if(data.message === "ok") {
                const popupList = document.querySelectorAll(".popup");
                const popBox = document.querySelector(".popup-wrapper");
                createCard(api,body,document.querySelector(".container"), Array.from(popupList));
                console.log("store: "+store);
                console.log("body: "+body);
                store.push(body);
                localStorage.setItem("cats", JSON.stringify(store));
                e.target.reset();

                

                popupList.forEach(p => {
                        p.classList.remove("active");
                        popBox.classList.remove("active");
                });
            }
            else { 
                popupList.forEach(p => {
                        p.classList.remove("active");
                });
                showPopup(api, popupList, "info", data.message);
            }
        })
}

const updCat = (e, api, id) => {
    e.preventDefault();
    let body = {};
    for(let i = 0; i < e.target.elements.length; i++) {
        let el = e.target.elements[i];
        if(el.name) {
            if(el.type === "checkbox") {
                body[el.name] = el.checked;
            } else if(el.value) {
                body[el.name] = el.value;
            }
        }
    }
    
    api.updCat(id, body)
        .then(res => res.json())
        .then(data => {
            console.log("data.message: "+data.message);
            const popupList = document.querySelectorAll(".popup");
            const popBox = document.querySelector(".popup-wrapper");
            if(data.message === "ok") {
                localStorage.removeItem('cats');
                location.reload();
                document.querySelector(".popup-wrapper").classList.remove("active");
            }
            else showPopup(api, popupList, "info", data.message);
        })
}

const getCatsList = () => {
    let catsList = localStorage.getItem("cats");
    if(catsList) {
       return catsList = JSON.parse(catsList);
    }
    else return false;
}

