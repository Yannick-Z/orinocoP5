

const cart = document.querySelector('#cart'); // Récupère la section du panier
const cartTotal = document.getElementById('cart-total'); //Récupère le h3 pour le prix total
const form = document.querySelector('form'); // Récupère le formulaire

const cartInformation = {
    contact: {},
    products: []
}
/* Stock le prix total */
let totalPrice = 0;

// Affiche le/les produit(s) du panier.
const displayCart = async () => {
    if(localStorage.length > 0) { 
        for (let i = 0; i < localStorage.length; i++) { // Pour chaque article du panier
        const product = await getCart(i) // Récupère les informations du produit
        const cameraId = product[0]; // Stocke l'id du produit
        const cameraName = product[1]; // Stocke le nom du produit
        const cameraPrice = product[2] / 100; // Stocke le prix du produit
        const cameraImg = product[3]; // Stocke l'image du produit
        cartInformation.products.push(cameraId); // Envoie l'id du produit au tableau products de cartInformation
        cartInformation.products.push(cameraName);
        cartInformation.products.push(cameraPrice);
        

        renderCart(cameraName, cameraPrice, cameraImg) // Fourni l'affichage du/des produits du panier

        const remove = document.querySelectorAll('.remove')[i]; 
        const article = document.querySelectorAll('article')[i];

        deleteCart(remove, article, cameraName) 
        }
    } else {
        cart.textContent = 'Votre panier est vide.';
        form.classList.add('invisible')
    }   
}
// Récupère élément dans localStorage
const getCart = async (index) => {
    return await JSON.parse(localStorage.getItem(localStorage.key(index)))
}
// Fourni l'affichage du/des produits du panier
const renderCart = (productName, productPrice, imgUrl) => {
    /* Affiche article(s) du panier */
    const article = document.createElement('article');
    article.innerHTML = `
    <img src="${imgUrl}">
    <div class="product-information>
    
        <p class="price">${productPrice}€</p>
    </div>
    <p class="remove">supprimer</p>`
    cart.insertBefore(article, cartTotal); // Insère article avant cartTotal
    
    totalPrice += productPrice; /* Implémente prix */ 
    cartTotal.textContent = `Total : ${totalPrice}€`; /* Affiche le prix total */
}
/* Supprime élément du panier sur un clique*/
const deleteCart = (removeElt, container, productName) => {
    removeElt.addEventListener('click', async () => {/* Gestionnaire d'évènement sur clique */
        await localStorage.removeItem(productName);/* Supprime item du localStorage */
        container.remove(); /* Supprime item du DOM */
        location.reload(true); /* Actualise la page dynamiquement */
    })
}
displayCart();

const submitBtn = document.getElementById('submitBtn');

const validate = () => {
  
  const username = document.getElementById('username');
  const emailAddress = document.getElementById('email-address');
  const prenom = document.getElementById('prenom');
  const ville = document.getElementById('ville');

  if (username.value === "") {
    alert("Please enter your username.");
    username.focus();
    return false;
  }
    
  if (emailAddress.value === "") {
    alert("Please enter your email address.");
    emailAddress.focus();
    return false;
  }

  if (!emailIsValid(emailAddress.value)) {
    alert("Please enter a valid email address.");
    emailAddress.focus();
    return false;
  }

  if (prenom.value === "") {
      alert("Please enter your firstname")
      prenom.focus();
      return false;
  }

  if (ville.value === "") {
      alert("Please enter your city")
      ville.focus();
      return false
  }
  
  return true; // Can submit the form data to the server
}

const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



const postData = async (method, url, dataElt) => {
    const response = await fetch(url, {
        headers: {
            'Content-Type' : 'application/json'
        },
        method,
        body: JSON.stringify(dataElt)
    })
    return await response.json();
}

submitBtn.addEventListener("click", async (e) => {
    alert("formulaire a bien été soumis");
    
   // Redirige vers la page de confirmation de commande
    e.preventDefault(); 
    const validForm = validate();
    if (validForm !== false ) {
        const response = await postData('POST', 'http://localhost:3000/api/cameras/order', cartInformation); // Envoie données au serveur    
        window.location.href = `./confirmation.html?id=${response.orderId}&price=${totalPrice}&user=${prenom.value}&`; // Redirige vers la page de confirmation de commande
    } 
})