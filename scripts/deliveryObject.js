export const deliveryObject=[
    {
        id:'1',
        deliveryDay:7,
        priceCents:0
    },
    {
        id:'2',
        deliveryDay:3,
        priceCents:499
    },
    {
        id:'3',
        deliveryDay:1,
        priceCents:999
    }
]
export function funs(deliveryObjectId){
    let matchingdel;
    deliveryObject.forEach((object)=>{
      if (deliveryObjectId===object.id){
         matchingdel=object;
      }
    })
    return matchingdel
}

    
 