import {products, matchingFunction} from '../products.js';
import {formatCurrency} from '../money.js';
import {cart} from '../cart.js';
import {funs} from '../deliveryObject.js';

export function renderPaymentSummary(){
let items=0;
let productPrice=0;
let shippingPrice=0;
  cart.forEach((cartItem)=>{
    const matchingProduct=matchingFunction(cartItem.productId);
    const matchingdel=funs(cartItem.deliveryObjectId);
    productPrice+=matchingProduct.priceCents*cartItem.quantity;
    shippingPrice+=matchingdel.priceCents;
    items+=cartItem.quantity;
  });
  const total=productPrice+shippingPrice;
  const tax=total*0.1;
  const orderTotal=total+tax;
  const finipayHtml=`
             To place your order, you have to finish your payment first through telebir.Your total payment is <span class="money">$${formatCurrency(orderTotal)}</span>. Send this amount of money through our account number <span class="account-number">1000567854678</span>.<br><br>
             When you're done with your payment, you will get a verification number in your email. Then fill this verification number below to go to the next step.
  `;
  document.querySelector('.js-statement').innerHTML=finipayHtml;
  const itemHtml=`
   <div class="items">Items selected <span class="quan">${items}</span></div>
  `;
  document.querySelector('.js-middles-section').innerHTML=itemHtml;
  const priceHtml=`
  <div class="pay-item">
             <div class="ite">
               Items(${items})
             </div>
             <div class="itep">
                $${formatCurrency(productPrice)}
             </div>
           </div>
           <div class="pay-item">
             <div class="ite">
               Price for shipping
             </div>
             <div class="itep">
                $${formatCurrency(shippingPrice)}
             </div>
           </div>
           <div class="pay-item">
             <div class="ite">
               Total before tax
             </div>
             <div class="itep ites">
                $${formatCurrency(total)}
             </div>
           </div>
           <div class="underlines"></div>
           <div class="pay-item">
             <div class="ite">
               Estimated Tax(10%)
             </div>
             <div class="itep">
                $${formatCurrency(tax)}
             </div>
           </div>
           <div class="underline"></div>
           <div class="pay-item">
             <div class="ite">
               Order Total
             </div>
             <div class="itep">
                $${formatCurrency(orderTotal)}
             </div>
           </div>
  `;
  document.querySelector('.js-payment-description').innerHTML=priceHtml;
}
