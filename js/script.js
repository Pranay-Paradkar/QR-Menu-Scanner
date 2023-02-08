let tempData = [...data]

let preveiwContainer = document.querySelector('.products-preview');

let productContainer = document.querySelector('.products-container');

const filteredButton = document.querySelectorAll(".filter button");

filteredButton.forEach((btn)=>{
  btn.addEventListener("click",(event)=>{
    const category = event.target.id;

    if(category == "ALL") tempData = [...data]
    else tempData = data.filter(e=>e.category == category)

    productContainer.innerHTML=tempData.map((product)=>{
      const { id, src, name, rating, price, description } = product 
      return `<div class="product" data-name="${id}">
               <img src="${src}" alt="">
               <h3>${name}</h3>
               <div class="price">₹${price}/-</div>
            </div>`
      })

      preveiwContainer.innerHTML=tempData.map((product)=>{
        const { id, src, name, rating, price, description} = product
        return `<div class="preview" data-target="${id}">
        <i class="fas fa-times"></i>
        <img src="${src}" alt="">
        <h3>${name}</h3>
        <div class="stars">
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star-half-alt"></i>
           <span>( 250 )</span>
        </div>
        <p> ${description}</p>
        <div class="price">₹${price}/-</div>
        <div class="buttons">
           <a href="#" class="buy">buy now</a>
           <a href="Cart.html?id=${id}" class="cart">add to cart</a>
        </div>
     </div>`
      })
    
    let previewBox = preveiwContainer.querySelectorAll('.preview');
    document.querySelectorAll('.products-container .product').forEach(product =>{
      product.onclick = () =>{
        preveiwContainer.style.display = 'flex';
        let name = product.getAttribute('data-name');
    
        previewBox.forEach(preview =>{
          let target = preview.getAttribute('data-target');
          if(name == target){
            preview.classList.add('active');
          }
        });
    
      };
    });
    
    previewBox.forEach(close =>{
      close.querySelector('.fa-times').onclick = () =>{
        close.classList.remove('active');
        preveiwContainer.style.display = 'none';
      };
    });

  })
})


productContainer.innerHTML=tempData.map((product)=>{
  const { id, src, name, rating, price, description } = product 
  return `<div class="product" data-name="${id}">
           <img src="${src}" alt="">
           <h3>${name}</h3>
           <div class="price">₹${price}/-</div>
        </div>`
  })

  preveiwContainer.innerHTML=tempData.map((product)=>{
    const { id, src, name, rating, price, description} = product
    return `<div class="preview" data-target="${id}">
    <i class="fas fa-times"></i>
    <img src="${src}" alt="">
    <h3>${name}</h3>
    <div class="stars">
       <i class="fas fa-star"></i>
       <i class="fas fa-star"></i>
       <i class="fas fa-star"></i>
       <i class="fas fa-star"></i>
       <i class="fas fa-star-half-alt"></i>
       <span>( 250 )</span>
    </div>
    <p> ${description}</p>
    <div class="price">₹${price}/-</div>
    <div class="buttons">
       <a href="#" class="buy">buy now</a>
       <button class = "cart" data-id = ${id}>Add To Cart</button>
    </div>
 </div>`
  })


{/* <a href="Cart.html?id=${id}" class="cart">add to cart</a> */}
let previewBox = preveiwContainer.querySelectorAll('.preview');
document.querySelectorAll('.products-container .product').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');

    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });

  };
});

const allCartButton = document.querySelectorAll(".cart")
console.log(allCartButton)
allCartButton.forEach(btn=>{
  btn.addEventListener("click",(e)=>{
    localStorage.setItem("id",e.target.dataset.id)
    window.location.href = "http://127.0.0.1:5501/cart.html"
  })
})

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});
