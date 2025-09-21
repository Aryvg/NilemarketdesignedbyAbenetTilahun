export const orders=JSON.parse(localStorage.getItem('orders'))||[];
function saved(){
    localStorage.setItem('orders', JSON.stringify(orders));
}
export function addOrder(order){
   orders.unshift(order);
   saved();
}
export function matchingOr(orderId){
    let matchingOrder;
    orders.forEach((order)=>{
        if (orderId===order.id){
            matchingOrder=order;
        }
    })
    return matchingOrder;
}