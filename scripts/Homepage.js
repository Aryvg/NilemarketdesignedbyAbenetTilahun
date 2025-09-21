import {products, loadProducts} from './products.js';
import {formatCurrency} from './money.js';
import {cart, addToCart, cartQuan} from './cart.js';
async function loadPage(){
  await loadProducts();
  renderProducts(products);
  searchTab(products);
  searchTabs(products);
}
loadPage();
export function renderProducts(products){
  let HomepageHtml='';
/*products.forEach((product)=>{*/
  const url=new URL(window.location.href);
  const search=url.searchParams.get('search');

  let filteredProducts=products;
  if (search) {
    filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }
  
  if (filteredProducts.length===0){
    document.querySelector('.js-main').innerHTML=`<div style="color:white;
    margin-top:0px;">Product not found</div>`;
  }else{

  filteredProducts.forEach((product)=>{
  HomepageHtml+=`
   <div class="product-container js-product-container">
        <div class="image-container">
          <div class="cons">
            <img src="${product.image}">
          </div>
        </div>
        <div class="product-description">
           <div class="product-name">
            ${product.name}
           </div>
           <div class="product-price">
             $${formatCurrency(product.priceCents)}
           </div>
           <div class="Quantity-selection">
             <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
             </select>
             <button class="add-to-cart js-add-to-cart"
             data-product-id="${product.id}">Add-to-cart</button>
           </div>
        </div>
       </div>
  `;
  
});
document.querySelector('.js-main').innerHTML=HomepageHtml;
}
cartQuan();
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId=button.dataset.productId;
    const productContainer=button.closest('.js-product-container');
    const quantity=Number(productContainer.querySelector('select').value);
    addToCart(productId, quantity);
    cartQuan();
  })
})
document.querySelector('.js-search-button').addEventListener('click', ()=>{
  const input=document.querySelector('.input1').value;
  window.location.href=`Homepage.html?search=${input}`;
});
document.querySelector('.input1').addEventListener('keydown', (event)=>{
  if (event.key==='Enter'){
    document.querySelector('.js-search-button').click();
  }
});
document.querySelector('.search-button3').addEventListener('click', ()=>{
  const input=document.querySelector('.input3').value;
  window.location.href=`Homepage.html?search=${input}`;
});
document.querySelector('.input3').addEventListener('keydown', (event)=>{
  if (event.key==='Enter'){
    document.querySelector('.search-button3').click();
  }
})

}
//renderProducts(products);

/*function load2(){
  const searchValue=document.querySelector('.input1').value.toLowerCase().trim();
    const searchedProduct=products.filter(product=>
      product.name.toLowerCase().includes(searchValue)
    )
    if (searchedProduct.length===0){
      document.querySelector('.js-main').innerHTML=`<div style="color:white; font-size:20px;">
       Product not found
      </div>`
    }else{
      renderProducts(searchedProduct);
    }
}
document.querySelector('.search-button').addEventListener('click', ()=>{
  load2();
})
function load1(){
  const searchValue=document.querySelector('.input3').value.toLowerCase().trim();
    const searchedProduct=products.filter(product=>
      product.name.toLowerCase().includes(searchValue)
    )
    if (searchedProduct.length===0){
      document.querySelector('.js-main').innerHTML=`<div style="color:white; font-size:20px;">
       Product not found
      </div>`
    }else{
      renderProducts(searchedProduct);
    }
}
document.querySelector('.search-button3').addEventListener('click', ()=>{
  load1();
})

document.querySelector('.input3').addEventListener('keydown', (event)=>{
  if (event.key==='Enter'){
    load1();
  }
});
document.querySelector('.input1').addEventListener('keydown', (event)=>{
  if (event.key==='Enter'){
    load2();
  }
})
*/
document.querySelector('.js-menu').addEventListener('click', ()=>{
   document.getElementById('123').style.width="100%";
   //document.querySelector('.js-main').style.marginTop='120px';
   document.body.style.paddingTop='114px'
});
document.querySelector('.js-times').addEventListener('click', ()=>{
  document.getElementById('123').style.width="0px";
  //document.querySelector('.js-main').style.marginTop='0px';
  document.body.style.paddingTop='70px'
});

const MoreButton=document.querySelector('.js-sign-up-button');
document.querySelector('.js-sign-up-button').addEventListener('click', ()=>{
    if (MoreButton.innerText==='More'){
      document.querySelector('.sl-div').style.visibility='visible';
      MoreButton.innerText='Cancel'
    }else{
      document.querySelector('.sl-div').style.visibility='hidden';
      MoreButton.innerText='More';
    }
  });
document.querySelector('.js-first').addEventListener('click', ()=>{
  document.querySelector('.first-contained').style.display='block';
});
document.querySelector('.js-second').addEventListener('click', ()=>{
  document.querySelector('.second-contained').style.display='block';
});
document.querySelector('.time').addEventListener('click', ()=>{
  document.querySelector('.first-contained').style.display='none';
});
document.querySelector('.js-time').addEventListener('click', ()=>{
  document.querySelector('.second-contained').style.display='none';
});
document.querySelector('.cancel').addEventListener('click', ()=>{
  document.querySelector('.first-contained').style.display='none';
});
document.querySelector('.js-cancelled').addEventListener('click', ()=>{
  document.querySelector('.second-contained').style.display='none';
});
document.querySelector('.search-storage').style.display='none'
function searchTab(products){
let searchHtml='';
products.forEach((product)=>{
  searchHtml+=`
  <div class="search-content">${product.name}</div>
  `;
document.querySelector('.search-container').innerHTML=searchHtml;
const input=document.querySelector('.input1');
const items=document.querySelectorAll('.search-content');
const searchStorage=document.querySelector('.search-storage');
searchStorage.style.display="none";
document.querySelector('.input1').addEventListener('click', ()=>{
  searchStorage.style.display="";
})
document.querySelector('.input1').addEventListener('keyup', ()=>{
  let found=false;//makes the searchStorage to disappear when no product is found.
  items.forEach((item)=>{
  const filter=input.value.toLowerCase();
  if (item.textContent.toLowerCase().includes(filter)){
    item.style.display="";
    found=true;
  }else{
    item.style.display="none";
  }
});
searchStorage.style.display= found ?"":"none";
});
items.forEach((item)=>{
  item.addEventListener('click', ()=>{
    const text=item.textContent;
    input.value=text;
    searchStorage.style.display="none";
    document.querySelector('.js-search-button').click();
  })
})
document.addEventListener('click', (e)=>{
  if (!input.contains(e.target) && (!searchStorage.contains(e.target || e.target===searchStorage))){
    searchStorage.style.display="none";
  }
})

})
}
document.querySelector('.search-storages').style.display="none";
function searchTabs(products){
  let searchHtml='';
  products.forEach((product)=>{
    searchHtml+=`
    <div class="search-content">${product.name}</div>
    `;
    document.querySelector('.js-search-container').innerHTML=searchHtml;
  
  const input=document.querySelector('.input3');
  const items=document.querySelectorAll('.search-content');
  const searchStorage=document.querySelector('.search-storages');
  searchStorage.style.display="none";
  document.querySelector('.input3').addEventListener('click', ()=>{
    searchStorage.style.display="";
  })
  document.querySelector('.input3').addEventListener('keyup', ()=>{
    let found=false;//makes the searchStorage to disappear when no product is found.
    items.forEach((item)=>{
    const filter=input.value.toLowerCase();
    if (item.textContent.toLowerCase().includes(filter)){
      item.style.display="";
      found=true;
    }else{
      item.style.display="none";
    }
  });
  searchStorage.style.display= found ?"":"none";
  });
  
  items.forEach((item)=>{
    item.addEventListener('click', ()=>{
      const text=item.textContent;
      input.value=text;
      searchStorage.style.display="none";
      document.querySelector('.search-button3').click();
    })
  })
  document.addEventListener('click', (e)=>{
    if (!input.contains(e.target) && (!searchStorage.contains(e.target || e.target===searchStorage))){
      searchStorage.style.display="none";
    }
  })
  
  })
  }

