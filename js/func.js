const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

const createCard = (data, parent, arr) => {
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
        showPopup(arr, "card", data);
    });

    parent.append(card);
}

const showPopup = (list, type, content) => {
    let el = list.filter(el => el.dataset.type === type)[0];
            
    switch (type) {
        case "card": 
        {
            const parent = document.querySelector(".contentPopup");
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
        }
        case "info":
        case "form":
    }

    
    el.classList.add("active");
    el.parentElement.classList.add("active");
}