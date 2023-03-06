const backbutton = document.querySelector(".back");
backbutton.addEventListener("click",()=>{
    location.href = "/"
})
let carts = [];

const payButton = document.querySelector(".pay")
payButton.disabled = true
//get cart from localstorage and store it in carts

let localCartData = localStorage.getItem("cart")
if(localCartData){
    localCartData = JSON.parse(localCartData)
    carts = localCartData
}

const items = document.querySelector(".items");

var id = localStorage.getItem("id")
localStorage.setItem("id","")

//to avoid increment of count when page reloaded
if(id){
    function isProductExists(id){
        console.log(carts.findIndex(c=>c.id == id)) 
        if(carts.findIndex(c=>c.id == id) != -1){
            return true;
        } else {
            return false;
    }
    }

    var filteredData = {...data.filter(d=>d.id == id)[0],count : 1}
    if(!isProductExists(id)){
        carts.push(filteredData);
    } else {
        carts = carts.map(c=>{
            const {count } = c
            if(c.id == id){
                return {...c,count : count + 1}
            } else return c
        })
    }
    //add cart data to localstorage
    localStorage.setItem("cart",JSON.stringify(carts))
}



//initial render
items.innerHTML = carts.map(e=>{
    const {  id, src, name, rating, price, description, count } = e;
    return `<div id = "${id}" class="Cart-Items">
    <div class="image-box">
        <img src=${src} style={{ height=”120px” }} />
    </div>
    <div class="about">
        <h1 class="title">${name}</h1>
        <p>Rating : ${rating}</p>
    </div>
    <div class="counter">
        <div class="btn inc">+</div>
        <div class="count">${count}</div>
        <div class="btn dec">-</div>
    </div>
    <div class="prices">
        <div class="amount">&#x20B9;${price}</div>
        <div class="remove"><i class="fa fa-trash-o"></i></div>
    </div>
</div>
`
}).join("")
//<i class="fa fa-trash-o"></i>

//logic for remove button
const AllRemoveBtn = document.querySelectorAll(".remove")
AllRemoveBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        const ParentElement = e.target.parentElement.parentElement.parentElement;
        const id = ParentElement.id;
        ParentElement.remove()
        carts = carts.filter(c=>c.id != id)
        localStorage.setItem("cart",JSON.stringify(carts))
    })
})

//logic for increment and decrement
const counterBtn = document.querySelectorAll(".counter .btn")
console.log(counterBtn)
counterBtn.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        const foodId = (e.target.parentElement.parentElement.id).toString()
        //actual price of product
        const actualFoodPrice = parseInt(data.filter(e=>e.id == foodId)[0].price)
        const { count : countOfFood } = carts.find(c=>c.id == foodId)

        //increment logic
        if(e.target.classList.contains("inc")){
            e.target.parentElement.querySelector(".count").innerText = countOfFood + 1
            e.target.parentElement.parentElement.querySelector(".amount").innerText = actualFoodPrice * (countOfFood + 1)
            carts = carts.map(c=>{
                if(c.id == foodId){
                    return {...c,count : countOfFood + 1, price : actualFoodPrice * (countOfFood + 1)}
                } else return c
            })
            localStorage.setItem("cart",JSON.stringify(carts))

            //decrement logic
        } else if(e.target.classList.contains("dec")){
            if(countOfFood - 1 > 0){
                e.target.parentElement.querySelector(".count").innerText = countOfFood - 1
                e.target.parentElement.parentElement.querySelector(".amount").innerText = actualFoodPrice * (countOfFood - 1)
                carts = carts.map(c=>{
                    if(c.id == foodId){
                        return {...c,count : countOfFood - 1, price : actualFoodPrice * (countOfFood - 1)}
                    } else return c
                })
                localStorage.setItem("cart",JSON.stringify(carts))
            }
        }
    })
})

payButton.addEventListener("click",()=>{
    window.location.assign("http://localhost:5000/index2.html")
})

if(carts.length){
    payButton.disabled = false;
}