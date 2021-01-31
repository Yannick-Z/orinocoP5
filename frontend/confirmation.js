const orderInformation = window.location.search.substr(1).split('&');
// const orderId = orderInformation[0].replace('id=', '');
// const totalPrice = orderInformation[1].replace('price=', '');
// const userName = orderInformation[2].replace('user=', '');
// console.log(totalPrice);
// document.querySelector('.order-id').textContent += orderId; 
// document.querySelector('.price').textContent += '499';


document.getElementById("confirmation").innerHTML = `

<h2>Commande validée</h2>
<br>
<br>
<p class="user">Merci ${orderInformation[2]} pour votre commande </p>
<br>
<br>
<p>Merci pour votre commande. Nous l'avons reçu et la traiterons dans les plus brefs délais.</p>
<br>
<p class="order-id">Votre numéro de commande est le ${orderInformation[0]}</p>
<br>
<p class="total-price">Votre commande s'élève à un prix total de <span class="price">${orderInformation[1]}</span>€</p>

`;