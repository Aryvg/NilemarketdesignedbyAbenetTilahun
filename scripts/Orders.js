import {products, matchingFunction, loadProducts} from './products.js';
import {orders, addOrder} from './order.js';
import {formatCurrency} from './money.js';
import {deliveryObject, funs} from './deliveryObject.js';
import {cart, removeFromCart, addToCart, cartQuan} from './cart.js';
let buyagain={};
async function loadPage(){
  await loadProducts();
  let ordersHtml='';
  orders.forEach((order)=>{
    order.products.forEach((products)=>{
      const product=matchingFunction(products.productId);
      if (!product) return;

      const url=new URL(window.location.href);
      const search=url.searchParams.get('search');

      const input1 = document.querySelector('.input1');
      input1.addEventListener('keyup', () => {
        const filter = input1.value.toLowerCase();
        const item = document.querySelector(`.is-ordered-${uniqueClass}`);
        const items = document.querySelector(`.js-head-${uniqueClass}`);
        //js-head-${uniqueClass}
        if (product.name.toLowerCase().includes(filter)) {
          item.style.display = "";
          items.style.display = "";
        } else {
          item.style.display = "none";
          items.style.display = "none";
        }
      });

      const input3 = document.querySelector('.input3');
      input3.addEventListener('keyup', () => {
        const filter = input3.value.toLowerCase();
        const item = document.querySelector(`.is-ordered-${uniqueClass}`);
        const items = document.querySelector(`.js-head-${uniqueClass}`);
        //js-head-${uniqueClass}
        if (product.name.toLowerCase().includes(filter)) {
          item.style.display = "";
          items.style.display = "";
        } else {
          item.style.display = "none";
          items.style.display = "none";
        }
      });
      //js-order-${product.id}
      const uniqueClass = `${product.id}-${order.id}`;
      ordersHtml+=`
        <div class="orders-header js-head-${uniqueClass}">
         <div class="order-header js-order-${uniqueClass}">
          Your order
         </div>
         <div class="order-header js-order-${uniqueClass}">
          Order details
         </div>
        </div>
        <div class="order-details is-ordered-${uniqueClass}">
          <div class="order-description">
            <div class="image-containerd">
             <img src="${product.image}">
        </div>
     <div class="ord js-ord-${uniqueClass}">
       <div class="product-name name">
         ${product.name}
        </div>
        <div class="product-quantity">
         Quantity:<span class="quant">${products.quantity}</span>
        </div>
     <div class="but">
       <div class="buy-but">
         <button class="buy-again-button js-buy-${uniqueClass}"
         data-product-id="${product.id}">Buy it again</button>
        </div>
        <a href="track.html?orderId=${order.id}&productId=${product.id}"  class="track-order">
         <button class="track-package">Track order</button>
        </a>
     </div>
    </div>
          <div class="order-option js-order-option-${uniqueClass}">
             ${deliFun(order, products)}
           </div>
         </div>
        </div>
      </div>
      `;
    });
    document.querySelector('.js-order1').innerHTML = ordersHtml;
  });
    orders.forEach((order)=>{
      order.products.forEach((products)=>{
        const product=matchingFunction(products.productId);
        if (!product) return;
        /*const input1 = document.querySelector('.input1');
        input1.addEventListener('keyup', () => {
          const filter = input1.value.toLowerCase();
          const item = document.querySelector(`.js-ord-${uniqueClass}`);
          if (product.name.toLowerCase().includes(filter)) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });*/
      const uniqueClass = `${product.id}-${order.id}`;
      document.querySelectorAll(`.js-buy-${uniqueClass}`).forEach((button)=>{
        button.addEventListener('click', ()=>{
          button.innerHTML='Added';
          setTimeout(()=>{
            button.innerHTML='Buy it again';
          }, 700);
          const productId=button.dataset.productId;
          if (!buyagain[productId]){
            buyagain[productId]=1;
          }else{
            buyagain[productId]++;
          }
          removeFromCart(productId);
          addToCart(productId, buyagain[productId]);
        })
      })
      const buttons=document.querySelectorAll(`.js-order-${uniqueClass}`);
      if (buttons.length > 0) {
      buttons[0].classList.add('active');
      buttons.forEach((button)=>{
        button.addEventListener('click', ()=>{
          buttons.forEach((btn)=>{
            btn.classList.remove('active');
          })
          button.classList.add('active');
          if (button.innerText==='Your order'){
            document.querySelector(`.js-ord-${uniqueClass}`).style.display='flex';
            document.querySelector(`.js-order-option-${uniqueClass}`).style.display='none';
          }else if (button.innerText==='Order details'){
            document.querySelector(`.js-ord-${uniqueClass}`).style.display='none';
            document.querySelector(`.js-order-option-${uniqueClass}`).style.display='flex';
          }
        })
      })
    }
 })
});
      /*orders.forEach((order)=>{
        const buttons=document.querySelectorAll(`.js-order-${order.id}`);
          buttons[0].classList.add('active');
        buttons.forEach((button)=>{
          button.addEventListener('click', ()=>{
            buttons.forEach((btn)=> 
              btn.classList.remove('active'));
            button.classList.add('active');
      
            // find the parent container of this order
            const orderContainer = button.closest('.orders-header').nextElementSibling;
            const ord = orderContainer.querySelector('.ord');
            const orderOption = orderContainer.querySelector('.order-option');
      
            if (button.innerText==='Your order'){
              ord.style.visibility='visible';
              orderOption.style.visibility='hidden';
            } else if (button.innerText==='Order details'){
              ord.style.visibility='hidden';
              orderOption.style.visibility='visible';
            }
          })
        })
      });*/
   function deliFun(order, products){
    const product=matchingFunction(products.productId);
    let html=''
    if (!(order.products)|| !(Array.isArray(order.products))){
      console.warn('error occured');
      return;
    }
      deliveryObject.forEach((deliveryObjects)=>{
      const matchingdel=funs(deliveryObjects.id)
      const price=((product.priceCents)*products.quantity)+(matchingdel.priceCents);
      html=`
        <div class="placed"><span class="for">Bought on:</span>${dayjs(order.orderTime).format('MMMM D, dddd')}</div>
            <div class="placed"><span class="for">Total:</span> $${formatCurrency(price+(price*0.1))}</div>
            <div class="placed"><span class="for">OrderId:</span>${order.id}</div>
      `;
    })
    return html;
   }
}
loadPage();
const headerMoreHtml=`
      <button id="header5" class="sign-up-button js-sign-up-button">More</button>
      <div class="sl-div solve" id="header6">
         ${moreFun()}
      </div>
`;
document.querySelector('.js-header-more').innerHTML=headerMoreHtml;
function moreFun(){
let html;
let amount=0;
let prices=0;
orders.forEach((order)=>{
  order.products.forEach((products, index)=>{
    const each=products.quantity;
    const eachquan=1;
    amount+=eachquan;
    prices+=each;
    html=`
    <button class="firsts js-first">A total of <span class="t">${amount}</span> items bought</button>
    <button class="seconds js-second">A total of <span class="t">${prices}</span> products in full</button>
  `;
  })
})
return html;
}

document.querySelector('.js-menu').addEventListener('click', ()=>{
  document.getElementById('123').style.width="100%";
  //document.querySelector('.js-main').style.marginTop='120px';
  document.body.style.paddingTop='200px'
});
document.querySelector('.js-times').addEventListener('click', ()=>{
 document.getElementById('123').style.width="0";
 //document.querySelector('.js-main').style.marginTop='0px';
 document.body.style.paddingTop='150px'
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
cartQuan();

/*orders.forEach((order)=>{
const buttons=document.querySelectorAll(`.js-order-${order.id}`);
buttons[0].classList.add('active');
buttons.forEach((button)=>{
  button.addEventListener('click', ()=>{
    buttons.forEach((btn)=>{
      btn.classList.remove('active');
    })
    button.classList.add('active');

    if (button.innerText==='Your order'){
      document.querySelector('.ord').style.visibility='visible';
      document.querySelector('.order-option').style.visibility='hidden';
    }else if (button.innerText==='Order details'){
      document.querySelector('.ord').style.visibility='hidden';
      document.querySelector('.order-option').style.visibility='visible';
    }
  })
})
})*/
/*const buttons=document.querySelectorAll(`.order-header-${order.id}">`);
buttons[0].classList.add('active');
buttons.forEach((button)=>{
  button.addEventListener('click', ()=>{
    buttons.forEach((btn)=>{
      btn.classList.remove('active');
    })
    button.classList.add('active');

    if (button.innerText==='Your order'){
      document.querySelector('.ord').style.visibility='visible';
      document.querySelector('.order-option').style.visibility='hidden';
    }else if (button.innerText==='Order details'){
      document.querySelector('.ord').style.visibility='hidden';
      document.querySelector('.order-option').style.visibility='visible';
    }
  })
})*/



