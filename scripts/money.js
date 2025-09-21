/*export function formatCurrency(priceCents){
  return (Math.round(priceCents)/100).toFixed(2);
}*/
export function formatCurrency(priceCents){
  const dollar= (Math.round(priceCents)/100);
  return dollar.toLocaleString('en-US',
    {minimumFractionDigits:2,
      maximumFractionDigits:2
    }
  )
}