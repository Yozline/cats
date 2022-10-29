const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );

const createCard = (data, parent) => {
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
    
    
    if(data.rate > 0) {
       
    }
    else if(data.rate > 5) rate.innerHTML = `<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>`;
    else rate.innerHTML = `<i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>`;

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
    // card.addEventListener("click", function() {
    //     showPopup(arr, "card");
    // });
    parent.append(card);
}