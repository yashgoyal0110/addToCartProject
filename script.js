const API = "https://content.newtonschool.co/v1/pr/65f821a4f6a42e24cda7e50c/productsData";
const container = document.querySelector(".productscontainer");
const cartcount = document.querySelector(".carticon");
let items = 0;

let listofcart = {};
async function fetchdata(){
    let data = await fetch(API);
    let final = await data.json()
    console.log(final);
    for (let i = 0 ; i < final.length; i++){
        let div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `<img width="250px" height="350px" src=${final[i].image} alt="title" />
                        <p class='ptitle'>${final[i].title}</p>
                        <div class="priceandaddtocart">
                            <p class="pprice">${final[i].price} DH</p>
                            <button class="addtocart" data-productid=${final[i].id}></button>
                        </div>`;
        container.appendChild(div);
        div.querySelector('.addtocart').addEventListener('click', function () {
            addit(final[i]);
        });
    }
}
fetchdata();
const header = document.querySelector("header");
header.style.position = "sticky";
header.style.top = 0;

document.querySelector(".carticon").addEventListener('click',opendiv);
function opendiv(){
    document.querySelector(".cartui").classList.add("cartopened");
}
document.querySelector(".closecart").addEventListener('click',closediv);
function closediv(){
    document.querySelector(".cartui").classList.remove("cartopened");
}

const pccontainer = document.querySelector(".pccontainer");

function addit(prod){
    const productId = prod.id;
    if (!(productId in listofcart)){
        listofcart[productId] = 1;
        addprod(prod);
    }else if (listofcart[prod.id] == 0) {
        listofcart[productId] = 1;
        addprod(prod);
    }else{
        listofcart[productId] += 1;
    }
}
function addprod(prod){
    let cartproduct = document.createElement("div");
    cartproduct.classList.add('cartproduct');
    cartproduct.innerHTML = `
        <div class="pnp">
            <img class='pimage' width="100px" height="150px" src="${prod.image}">
            <div class="nameandprice">
                <p>${prod.title}</p>
                <p>${prod.price}</p>
                <div class='qtt'>
                    <p>Qty: </p>
                    <p class="minusqtt"> - </p>
                    <p class="counter">1</p>
                    <p class="addqtt"> + </p>
                </div>
            </div>
        </div>
        <button class="delete" productid="${prod.id}">X</button>
        `;
    pccontainer.appendChild(cartproduct);
    let counter = 1;
    let count = cartproduct.querySelector(".counter");




    cartproduct.querySelector(".minusqtt").addEventListener('click' ,  function () {
        if (counter > 1){
            counter -=1;
            if (items > 1){ 
                items-=1;
            }
        }
        count.textContent = counter;
        cartcount.setAttribute('items', items);
    });
    cartproduct.querySelector(".addqtt").addEventListener('click' ,  function () {
        items+=1;
        counter+=1;
        count.textContent = counter;
        cartcount.setAttribute('items', items);
    });

 




    items+=1;
    cartproduct.querySelector('.delete').addEventListener('click', function () {
        cartproduct.remove();
        listofcart[prod.id] = 0;
        if (items >= 1){
            items-=counter;
        }
        
        cartcount.setAttribute('items', items);
    });
    cartcount.setAttribute('items', items);
}
