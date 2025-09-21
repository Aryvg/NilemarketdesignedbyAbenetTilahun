import {products, matchingFunction} from '../products.js';
import {formatCurrency} from '../money.js';
import {cart, removeFromCart, update, resetCart} from '../cart.js';
import {deliveryObject, funs} from '../deliveryObject.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {addOrder} from '../order.js';
export function renderPayment(){
let paymentHtml='';
cart.forEach((cartItem)=>{
  const productId=cartItem.productId;
  const matchingProduct=matchingFunction(productId);
  console.log(matchingProduct);
  const deliveryObjectId=cartItem.deliveryObjectId;
  const matchingdel=funs(deliveryObjectId);
  const today=dayjs();
    const deliveryDate=today.add(matchingdel.deliveryDay, 'days');
    const deliveryString=deliveryDate.format('dddd, MMMM D');
  paymentHtml+=`
 <div class="payment-product js-payment-product-${matchingProduct.id}">
            <div class="delete delete-${matchingProduct.id} js-delete-button"
            data-product-id="${matchingProduct.id}">Delete</div>
            <div class="container">
             <div class="image-containers">
               <img src="${matchingProduct.image}">
              </div>
              <div class="payments-product" style="background-color:rgb(204, 204, 204);">
               <div class="payment-product-details">
                 <div class="delivery-date">
                   Reaching you on ${deliveryString}
                 </div>
                 <div class="product-name">
                   ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-prices">
                   Total with shipping price:
                   $${formatCurrency(((matchingProduct.priceCents)+(matchingdel.priceCents))*cartItem.quantity)}
                 </div>
                  <div class="product-quantity js-quantity-${matchingProduct.id}">
                    Quantity:<span class="quant">${cartItem.quantity}</span>
                 </div>
                 <div class="delivery-button">
                  <button class="deliverbut js-delivery-date-${matchingProduct.id}">Choose delivery date</button>
                 </div>
                </div>
              </div>
            </div>
         </div>
  
     <div class="sixth-contained js-sixth-contained-${matchingProduct.id}">
    <form method="POST" action="" class="log animate">
      <div class="heads">
        <div href="" class="company-name">
          <span class="Nile-class">Nile</span>
          <span class="Market-class">Market</span>
        </div>
        <div class="time js-timess-${matchingProduct.id}">&times;</div>
      </div>
      <div class="">
        <div class="delivery-options">
          <div class="delivery-option">
            Choose a delivery date for <span class="sna">${matchingProduct.name}</span>
          </div>
          ${deliveryFunction(matchingProduct, cartItem)}
        </div>
      </div>
      <div class="boths">
        <button type="button" class="cancel js-cance-${matchingProduct.id}">Cancel</button>
      </div>
    </form>
  </div>
  `;
})



document.querySelector('.js-pro-container').innerHTML=paymentHtml;
document.querySelectorAll('.js-delete-button').forEach((button)=>{
  button.addEventListener('click', ()=>{
    const productId=button.dataset.productId;
    removeFromCart(productId);
    const container=document.querySelector(`.js-payment-product-${productId}`);
    container.remove();
    renderPayment();
    renderPaymentSummary();
    paymentButton();
  });
});

 
      
function deliveryFunction(matchingProduct, cartItem){
  let html='';
  deliveryObject.forEach((deliveryObjects)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryObjects.deliveryDay, 'days');
    const deliveryString=deliveryDate.format('MMMM D, dddd');
    
    const priceString=deliveryObjects.priceCents===0
    ?'FREE'
    : `${formatCurrency(deliveryObjects.priceCents)}`
    
   const isChecked=cartItem.deliveryObjectId===deliveryObjects.id;
    html+=`
    <div class="delivery-rate">
         <div class="delivered-on">
           <div class="js-rd rd"
           data-product-id="${matchingProduct.id}"
            data-delivery-object-id="${deliveryObjects.id}">
             <input  type="radio" name="delivery-${matchingProduct.id}" ${isChecked ?'checked' :''} class="inputradio">
           </div>
           <div class="dates">
             <div class="date">${deliveryString}</div>
             <div class="date-price">${priceString}</div>
           </div>
        </div>
   </div>
  
`;
  });
  return html;
}

  document.querySelectorAll('.js-rd').forEach((buttond)=>{
    buttond.addEventListener('click', ()=>{
      const {productId, deliveryObjectId}=buttond.dataset;
      update(productId, deliveryObjectId);
      renderPayment();
      renderPaymentSummary();
      paymentButton();
    })
  })
  



document.querySelector('.js-menu').addEventListener('click', ()=>{
  document.getElementById('123').style.width="100%";
  //document.getElementById('126').style.marginTop="100px";
  document.body.style.paddingTop='127px'
});
document.querySelector('.js-times').addEventListener('click', ()=>{
 document.getElementById('123').style.width="0px";
 //document.getElementById('126').style.marginTop="0px";
  document.body.style.paddingTop='90px'
});

document.querySelector('.js-place-your-order').addEventListener('click', ()=>{
  document.querySelector('.third-contained').style.display='block';
});
document.querySelector('.js-time').addEventListener('click', ()=>{
  document.querySelector('.third-contained').style.display='none';
});
document.querySelector('.js-cancelled').addEventListener('click', ()=>{
  document.querySelector('.third-contained').style.display='none';
});
document.querySelector('.js-next').addEventListener('click', ()=>{
  const input = document.querySelector('.inputs'); // your password input
  if (!input.value.trim()) {
    input.reportValidity(); // shows browser "Please fill out this field"
    return; // stop going to next step
  }
  document.querySelector('.fourth-contained').style.display='block';
  document.querySelector('.third-contained').style.display='none';
});
document.querySelector('.tm').addEventListener('click', ()=>{
  document.querySelector('.fourth-contained').style.display='none';
});
document.querySelector('.js-cancels').addEventListener('click', ()=>{
  document.querySelector('.fourth-contained').style.display='none';
});


function paymentButton(){
  const paid=document.querySelector('.js-payment-summary');
  const paymentDescription=document.querySelector('.js-payment-description');
  paid.addEventListener('click', ()=>{
     if (paid.innerText==='Open your payment Summary'){
       paid.innerText='Close your payment Summary';
       paymentDescription.style.display='block';
       paid.classList.add('paid');
     }else if (paid.innerText==='Close your payment Summary'){
      paid.innerText='Open your payment Summary';
      paymentDescription.style.display='none';
      paid.classList.remove('paid');
    }
  });
}
paymentButton();




cart.forEach((cartItem)=>{
  const productId=cartItem.productId;
  let matchingProduct;
  products.forEach((product)=>{
    if (productId===product.id){
       matchingProduct=product;
    }
  });
 document.querySelectorAll(`.js-delivery-date-${matchingProduct.id}`).forEach((buttons)=>{
    buttons.addEventListener('click', ()=>{
      document.querySelector(`.js-sixth-contained-${matchingProduct.id}`).style.display='block';
    });
    document.querySelector(`.js-timess-${matchingProduct.id}`).addEventListener('click', ()=>{
      document.querySelector(`.js-sixth-contained-${matchingProduct.id}`).style.display='none';
    });
    document.querySelector(`.js-cance-${matchingProduct.id}`).addEventListener('click', ()=>{
      document.querySelector(`.js-sixth-contained-${matchingProduct.id}`).style.display='none';
    });
  });
});
}

const placeHtml=`
<button type="button"  class="login js-placed-your-order">Place your order</button>
<button type="button" class="cancel js-cancels">Cancel</button>
`;
document.querySelector('.js-boths').innerHTML=placeHtml;

document.querySelector('.js-placed-your-order').addEventListener('click', async ()=>{
  const response= await fetch('https://supersimplebackend.dev/orders', {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      cart:cart.map(item=>({
        productId:item.productId,
        quantity:item.quantity,
        deliveryOptionId:item.deliveryObjectId
      }))
    })
  })
  /*document.querySelectorAll('.js-delete-button').forEach((btn)=>{
    btn.click();
  })*/
  const order=await response.json();
  addOrder(order);
  
  /*cart.slice().forEach((cartItem)=>{
    removeFromCart(cartItem.productId);
    const btn=document.querySelectorAll(`.js-payment-product-${cartItem.productId}`);
    btn.forEach((container)=>{
      container.remove();
    })
})*/
  resetCart();
  window.location.href='orders.html';
});