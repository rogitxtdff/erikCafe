const basketElem = document.getElementById("basket");
const closeXElem = document.getElementById("close-X");
const continerBasket = document.getElementById("continer-basket");
const sumOfPriceElem = document.getElementById("sumOfPrice");
const countAllProduct = document.getElementById("count-all-product");
const removeAllProductElem = document.getElementById("remove-all-product");
const modalScreen = document.getElementById("modal-screen");







let basket = []


function getDataLocalStorage() {

  let value = JSON.parse(localStorage.getItem('basket'))

  if (value) {
    
    basket = value
   
  }else{

    basket = []

  }

 ;
 
  updateProductCount(basket)

  insertElemtoBasket(basket)
  
}

function updateProductCount(params) {

    console.log(params.length);
    
  if (params.length > 0) {
    countAllProduct.innerHTML = params.length;
    console.log(1);
  } else {
    countAllProduct.innerHTML = 0;
  }
}


function insertElemtoBasket(basket) {

  continerBasket.innerHTML = ''

  basket.forEach(function (event) {
    continerBasket.insertAdjacentHTML('beforeend',`
      <a   href="#">
                    <div class="w-[100%] h-[96px]  rounded-[5px] hover:shadow-2xl flex justify-between  items-center pb-5">
                        <div class="w-[22%] h-[100%] flex  justify-center items-center">
                            <img class="w-[40%]" src="./img/product/${event.img}" alt="">
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

function sumOfPrice(event) {

  let sum = 0

  event.forEach(function (params) {
    sum+= params.price * params.count
  })
  sumOfPriceElem.innerHTML = sum.toLocaleString()
}

function removeAllProduct() {

  basket=[]
  localStorage.removeItem('basket')
  

  insertElemtoBasket(basket)
  updateProductCount(basket)
  sumOfPrice(basket)
}

function plusCountFunc(event) {

    basket.forEach(function (params) {
        if (params.id == event) {
          params.count += 1
          
        }
      })

    insertToLocalStorage(basket)
    insertElemtoBasket(basket)
    sumOfPrice(basket)

  
}
function insertToLocalStorage(basket) {
  
  localStorage.setItem('basket',JSON.stringify(basket))

}
function minessCountFunc(event) {

    basket.forEach(function (params) {
        if (params.id == event) {
          params.count -= 1
          if (params.count == 0) {
            removeProduct(params.id)
            

          }
          
        }
      })

    insertToLocalStorage(basket)
    insertElemtoBasket(basket)
    sumOfPrice(basket)

  
}
function removeProduct(product) {
  basket = basket.filter(item => item.id != product);
  insertToLocalStorage(basket);
  insertElemtoBasket(basket);
  

  
  updateProductCount(basket)


}

window.addEventListener("load", getDataLocalStorage);
removeAllProductElem.addEventListener("click", removeAllProduct);

basketElem.addEventListener('click',function () {
  modalScreen.classList.remove('hidden')
})
closeXElem.addEventListener('click',function () {
  modalScreen.classList.add('hidden')
  
})