const orderInformation = window.location.search.substr(1).split('&');
const orderId = orderInformation[0].replace('id=', '');
const totalPrice = orderInformation[1].replace('price=', '');
const userName = orderInformation[2].replace('user=', '');
console.log(totalPrice);
/* document.querySelector('.order-id').textContent += orderId; */
document.querySelector('.price').textContent += '499';

