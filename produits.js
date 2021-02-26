// URL de l'api
const url = 'http://localhost:3000/api/cameras/';
// Recupere les paramètres de l'url
const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const article = document.querySelector('article');

// Affiche le produit
const displayProduct = async() => {
        const data = await getOneCamera(url, id);
        renderCamera(data);
        customizeYourCamera(article, data.lenses);
        addToCart(article, data);
    }
    // Récupère une caméra
const getOneCamera = async(productUrl, productId) => {
        const response = await fetch(productUrl + productId);
        return await response.json();
    }
    // Fourni l'affichage selon les données du produit
const renderCamera = (productData) => {
    article.innerHTML = `
    <div class="product">
        <img src="${productData.imageUrl}" alt="${productData.name}" width="30%">
        <div class="product-information">
            <h2 class="product-title">${productData.name}</h2>
            <p class="price">${productData.price / 100}€ </p>       
            <p class="description">${productData.description}</p>
        </div>
    </div>`;
}

// Personnalise le produit
const customizeYourCamera = (parentElt, productLenses) => {
        // Crée liste déroulante
        const label = document.createElement('label');
        const select = document.createElement('select');

        label.setAttribute('for', 'lenses-list');
        label.textContent = 'Couleurs disponibles : '
        select.id = "color-lenses";

        parentElt.appendChild(label);
        parentElt.appendChild(select);
        // Crée une balise option pour chaque lentille
        productLenses.forEach(productLenses => {
                const option = document.createElement('option');
                option.value = productLenses;
                option.textContent = productLenses.toUpperCase();
                select.appendChild(option);
            })
            // Récupère la lentille choisie dans la console
        select.addEventListener('change', (e) => {
            lensesChosen = e.target.value.toLowerCase();
            console.log(lensesChosen);
        });
    }
    // Ajoute le produit au panier
const addToCart = (parentElt, productData) => {
    // Crée le bouton d'envoie du produit
    const btn = document.createElement('button');
    const div = document.createElement('div');
    btn.textContent = 'Ajouter au panier';
    div.classList.add('add-to-cart');
    parentElt.appendChild(div);
    parentElt.appendChild(btn);

    // Assigne valeur à envoyer à localStorage
    const product = [productData._id, productData.name, productData.price, productData.imageUrl];
    // Envoie valeur à localStorage après un clique
    btn.addEventListener('click', () => {
        localStorage.setItem(productData.name, JSON.stringify(product));
        btn.classList.add('invisible')
        div.textContent = 'Le produit a été ajouté au panier !'
    })
}

displayProduct();