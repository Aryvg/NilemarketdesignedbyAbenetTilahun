import {renderPayment} from './payment/OrderSummary.js';
import {renderPaymentSummary} from './payment/paymentSummary.js';
import {loadProducts} from './products.js';
async function loadPage(){
    await loadProducts();
    renderPayment();
    renderPaymentSummary();
  }
  loadPage();