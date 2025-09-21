export let cart;
export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[];
}
/*{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:1,
    deliveryObjectId:'1'
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:2,
    deliveryObjectId:'2'
  } */
loadFromStorage();
function saveToLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart(productId, quantity=1){
  let matchingItem;
  for (let i=0; i<cart.length; i++){
    const cartItem=cart[i];
    if (productId===cartItem.productId){
      matchingItem=cartItem;
    }
  }
  if (matchingItem){
    matchingItem.quantity+=quantity;
  }else{
    cart.push({
      productId,
      quantity:quantity,
      deliveryObjectId:'1'
    });
  }
  saveToLocalStorage();
}
export function cartQuan(){
  let cartQuantity=0;
    let i=0;
    while (i<cart.length){
      const cartItem=cart[i];
      cartQuantity+=cartItem.quantity;
      i++;
    }
    document.querySelector('.js-button-size').innerHTML=cartQuantity;
    saveToLocalStorage();
}
export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
   if (productId!==cartItem.productId){
     newCart.push(cartItem);
   }
  })
  cart=newCart;
  saveToLocalStorage();
}

export function update(productId, deliveryObjectId){
  let matchingItem;
  for (let i=0; i<cart.length; i++){
    const cartItem=cart[i];
    if (productId===cartItem.productId){
      matchingItem=cartItem;
    }
  }
  matchingItem.deliveryObjectId=deliveryObjectId;
  saveToLocalStorage();
}
export function resetCart() {
  cart = [];
  saveToLocalStorage();
}