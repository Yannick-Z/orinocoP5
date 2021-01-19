const url = "http://localhost:3000/api/cameras"

// Affiche tous les produits
const displayProducts = async () => {
    const products = await getAllCameras(url)
    products.forEach(product => {
    renderProduct(product.name, product._id, product.imageUrl, product.price);
    });
}
// Récupère les cameras
const getAllCameras = async (url) => {
    const response = await fetch(url);
    return await response.json();
}
//On affiche les caméras
function renderProduct (productName, productId, productImg, productPrice) {
    const products = document.querySelector('#products');  // Récupère la div qui contiendra les différents articles 
    const article = document.createElement('article');
    article.innerHTML = `<img alt="${productName}" src="${productImg}" width="300">
    <button class="product-link" type="button"><a href="produit.html?id=${productId}">Voir plus</a></button>
    <p class="product-title">${productName}</p>
    <p class="price">${productPrice / 100}€</p>
    `
    products.appendChild(article);     
}

displayProducts();