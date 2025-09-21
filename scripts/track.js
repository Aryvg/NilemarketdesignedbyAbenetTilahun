import {products, matchingFunction} from './products.js';
import {orders, addOrder, matchingOr} from './order.js';
import {formatCurrency} from './money.js';
import {loadProducts} from './products.js';
import {deliveryObject, funs} from './deliveryObject.js';
import {cart, removeFromCart, addToCart,cartQuan} from './cart.js';

async function loadPage(){
  await loadProducts();
  const url=new URL(window.location.href);
  const orderId=url.searchParams.get('orderId');
  const productId=url.searchParams.get('productId');

  const matchingOrder=matchingOr(orderId);
  const matchingProduct=matchingFunction(productId);
  
  let productDetails;
  matchingOrder.products.forEach((item)=>{
    if (item.productId===matchingProduct.id){
       productDetails=item;
    }
  })

  const today=dayjs();
  const orderTime=dayjs(matchingOrder.orderTime);
  const deliveryTime=dayjs(productDetails.estimatedDeliveryTime);

  let percentProgress=((today-orderTime)/(deliveryTime-orderTime))*100;

  deliveryObject.forEach((deliveryObjects)=>{
    const matchingdel=funs(deliveryObjects.id)
  const price=((matchingProduct.priceCents)*(productDetails.quantity))+(matchingdel.priceCents);
  
 

  const trackHtml=`
    <div class="tracked">Track your order</div>
      <div class="track-headers">
        <div class="arrived">Reaching on  ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}</div>
        <div class="Quantity">Quantity: ${productDetails.quantity}</div>
        <div class="Quantity">Total:$${formatCurrency(price+(price*0.1))}</div>
      </div>
      <div class="track-main">
        <div class="con">
          <div class="track-image-container">
            <img src="${matchingProduct.image}">
           </div>
           <div class="product-name">
            ${matchingProduct.name}
           </div>
        </div>
        <div class="table">
          <div class="provided">
            <div class="prod">
             Provided by:
            </div>
            <div class="by">
              Abenet Tilahun
            </div>
          </div>
          <div class="provided">
           <div class="prod">
             Shipping method:
           </div>
           <div class="by">
              Express
           </div>
         </div>
         <div class="timeline">
          <div class="prod">Delivery progress:</div>
          <div class="delivery-pro">
            <div class="progress">
              <div class="pl1
              ${percentProgress<50 ?'current-status' :''}
              ">
                Order placed
              </div>
              <div class="pl1
              ${percentProgress>=50 && percentProgress<95.8 ?'current-status' :''}
              ">
                Dispatched
              </div>
              <div class="pl1
              ${percentProgress>=95.8 ?'current-status' :''}
              ">
                Delivered
              </div>
            </div>
            <div class="progress-bar" style="width:100%">
              <div class="inside"
              style="margin-left:min(${percentProgress}%, 97.5%);"
              ></div>
            </div>
          </div>
        </div>
        </div>
      </div>
  `;
  document.querySelector('.js-track-mains').innerHTML=trackHtml;
});
}
loadPage();
//<button id="header5" class="sign-up-button js-sign-up-button">More</button>
const headerMoreHtml=`
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
  document.body.style.paddingTop='130px'
});
document.querySelector('.js-times').addEventListener('click', ()=>{
 document.getElementById('123').style.width="0";
 //document.querySelector('.js-main').style.marginTop='0px';
 document.body.style.paddingTop='100px'
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