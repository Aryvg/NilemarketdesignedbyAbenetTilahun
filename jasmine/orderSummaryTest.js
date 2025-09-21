import {loadFromStorage, cart, addToCart} from '../scripts/cart.js';
import {renderPayment} from '../scripts/payment/OrderSummary.js';
describe('Tests the orderSummary page', ()=>{
    const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2='15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(()=>{
        document.querySelector('.js-test-container').innerHTML=`<div>
        <div class="js-pro-container"></div>
        <div class="js-menu"></div>
        <div class="js-times"></div>
        <div class="js-place-your-order"></div>
        <div class="js-time"></div>
        <div class="js-cancelled"></div>
        <div class="js-next"></div>
        <div class="tm"></div>
        <div class="js-cancels"></div>
        <div class="js-payment-summary"></div>
        <div class="js-statement"></div>
        <div class="js-middles-section"></div>
        <div class="js-payment-description"></div>
     </div>`;
     spyOn (localStorage, 'setItem');
  spyOn (localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
          productId:productId1,
          quantity:1,
          deliveryObjectId:'1'
        },
        {
          productId:productId2,
          quantity:2,
          deliveryObjectId:'2'
        }]);
  });
   loadFromStorage();
   renderPayment();
    })
    it ('tests the content of the function', ()=>{
     expect(document.querySelectorAll('.payment-product').length).toEqual(2);
     expect(cart.length).toEqual(2);
     expect(cart[0].productId).toEqual(`${productId1}`);
     expect(cart[0].quantity).toEqual(1);
     expect(cart[1].productId).toEqual(`${productId2}`);
     expect(cart[1].quantity).toEqual(2);
     expect(document.querySelector(`.js-quantity-${productId1}`).innerText).toContain('Quantity:1');
     expect(document.querySelector(`.js-quantity-${productId2}`).innerText).toContain('Quantity:2');
     document.querySelector('.js-test-container').innerHTML='';
    });
    it ('tests the delete button function', ()=>{
      document.querySelector(`.delete-${productId1}`).click();
      expect(document.querySelectorAll('.payment-product').length).toEqual(1);
      expect(document.querySelector(`.js-payment-product-${productId1}`)).toEqual(null);
      expect(document.querySelector(`.js-payment-product-${productId2}`)).not.toEqual(null);
      document.querySelector('.js-test-container').innerHTML='';
    });
})