const discountElem = document.getElementById("discount");
const imgElem = document.getElementById("img");
const nameElem = document.getElementById("name");
const categoryElem = document.getElementById("category");
const priceElem = document.getElementById("price");
const h1sAboutProduct = document.querySelectorAll("#h1-About-product");
const btnSale = document.getElementById("btn-sale");
const basketElem = document.getElementById("basket");
const closeXElem = document.getElementById("close-X");
const continerBasket = document.getElementById("continer-basket");
const modalScreen = document.getElementById("modal-screen");
const showCount = document.getElementById("show-count");
const plusElme = document.getElementById("plus");
const countNumElme = document.getElementById("count-num");
const minesElme = document.getElementById("mines");
const sumOfPriceElem = document.getElementById("sumOfPrice");
const countAllProduct = document.getElementById("count-all-product");
const removeAllProductElem = document.getElementById("remove-all-product");

let basket = []
let productSearched  = ''
let idSearch = ''

function getSearchParams() {
  let searchPrams = new URLSearchParams(location.search);
  idSearch = searchPrams.get("id");
  productSearched = coffeeProducts.find(function (event) {
    return event.id == idSearch;
  });

  changeElemValue(productSearched);
}



function changeElemValue(product) {
  discountElem.innerHTML = `${product.discount}%`;
  imgElem.src = `../img/product/${product.img}`;
  nameElem.innerHTML = product.name;
  categoryElem.innerHTML = product.category;
  priceElem.innerHTML = product.price.toLocaleString();
}


h1sAboutProduct.forEach(function (params) {
    params.addEventListener('click',function (params) {
        
        let h1About = document.querySelector('.active')
        h1About.classList.remove('active')
        params.target.classList.add('active')
    })
})


btnSale.addEventListener('click', function () {
    showCount.classList.add("seling")

    let isHave = basket.some(function (params) {
      return params.id == idSearch
    })

    if (isHave) {

      basket.forEach(function (params) {
        if (params.id == idSearch) {
          params.count += 1
          countNumElme.innerHTML = params.count
        }
      })

    }else{

      productSearched.count = 1
      basket.push(productSearched)
      
   
    }
    
    
    updateProductCount(basket)
    insertToLocalStorage(basket)
    insertElemtoBasket(basket)
 
    

    
})


function insertToLocalStorage(basket) {
  
  localStorage.setItem('basket',JSON.stringify(basket))

}

function getDataLocalStorage() {

  let value = JSON.parse(localStorage.getItem('basket'))

  if (value) {
    basket = value
    
    
    isHaveInBasket(basket)
  }else{
    basket = []
  }


  updateProductCount(basket)

  insertElemtoBasket(basket)
  
}



function insertElemtoBasket(basket) {

  continerBasket.innerHTML = ''

  basket.forEach(function (event) {
    continerBasket.insertAdjacentHTML('beforeend',`
      <a   href="#">
                    <div class="w-[100%] h-[96px]  rounded-[5px] hover:shadow-2xl flex justify-between  items-center pb-5">
                        <div class="w-[22%] h-[100%] flex  justify-center items-center">
                            <img class="w-[40%]" src="../img/product/${event.img}" alt="">
                        </div>


                        <div class="flex flex-col justify-evenly items-start w-[48%] h-[100%] ">
                            <h1 class="text-[.9rem]">${event.name}</h1>
                            <p class=" text-[.7rem] text-[#9B9895]">${event.category}</p>
                            <p class="text-[#9E624C] font-bold text-[.8rem]">${event.price.toLocaleString()}</p>

                        </div>


                        <div class="w-[30%] h-[100%]  flex flex-col justify-center gap-4 items-center">
                            <div class="w-[95%] h-[26px]  flex justify-between items-center"  >
                                <div onclick="plusCountFunc(${event.id})" class="w-[31%] h-[100%] rounded-[5px] bg-[#22c55e] hover:bg-[#43895d] flex justify-center items-center text-white text-[1.2rem]">+</div>
                                <div onclick="removeProduct(${event.id})" class="w-[31%] h-[100%] rounded-[5px] bg-[#dc2626] hover:bg-[#b20600] flex justify-center items-center text-[.6rem] text-white">remove</div>
                                <div onclick="minessCountFunc(${event.id})" class="w-[31%] h-[100%] rounded-[5px] bg-[#eab308] hover:bg-[#d8de16] flex justify-center items-center text-white text-[1.2rem] pb-1">-</div>
                            </div>
                            <div  class="flex justify-center items-center gap-1 text-[.9rem]">
                                <p>تعداد :</p>
                                <p>${event.count}</p>
                            </div>
                        </div>

                
                        </div>
                    </a>
      `)
  })
  sumOfPrice(basket)
  
}


function plusCountFunc(event) {

    basket.forEach(function (params) {
        if (params.id == event) {
          params.count += 1
          countNumElme.innerHTML = params.count
        }
      })

    insertToLocalStorage(basket)
    insertElemtoBasket(basket)
    sumOfPrice(basket)

  
}
function minessCountFunc(event) {

    basket.forEach(function (params) {
        if (params.id == event) {
          params.count -= 1
          if (params.count == 0) {
            removeProduct(params.id)
            showCount.classList.remove("seling")

          }else{
            countNumElme.innerHTML = params.count
          }
          
        }
      })

    insertToLocalStorage(basket)
    insertElemtoBasket(basket)
    sumOfPrice(basket)

  
}

function sumOfPrice(event) {

  let sum = 0

  event.forEach(function (params) {
    sum+= params.price * params.count
  })
  sumOfPriceElem.innerHTML = sum.toLocaleString()
}

// اصلاح تابع removeProduct
function removeProduct(product) {
  basket = basket.filter(item => item.id != product);
  insertToLocalStorage(basket);
  insertElemtoBasket(basket);
  

  showCount.classList.remove("seling");
  updateProductCount(basket)


}

function isHaveInBasket(event) {

  
  

  event.forEach(function (params) {
    
   
    
    if (params.id == idSearch) {
      showCount.classList.add('seling')
      countNumElme.innerHTML = params.count
      
    }
  })
  
}



function updateProductCount(basket) {
  if (basket) {
  countAllProduct.innerHTML = basket.length;
    
  }else{
  countAllProduct.innerHTML = 0

  }
}


function removeAllProduct() {

  basket=[]
  localStorage.removeItem('basket')
  showCount.classList.remove('seling')

  insertElemtoBasket(basket)
  updateProductCount(basket)
  sumOfPrice(basket)
}

window.addEventListener("load", getSearchParams);
window.addEventListener("load", getDataLocalStorage);

plusElme.addEventListener("click", function (params) {
  plusCountFunc(idSearch)
});
removeAllProductElem.addEventListener("click", removeAllProduct);
minesElme.addEventListener("click", function () {
  minessCountFunc(idSearch)
});
basketElem.addEventListener('click',function () {
  modalScreen.classList.remove('hidden')
})
closeXElem.addEventListener('click',function () {
  modalScreen.classList.add('hidden')
  
})