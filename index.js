// Ürünleri ve kullanıcıların işlemlerini yüklemek için

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});

function loadProducts() {
    // Yerel depolama veya API üzerinden ürün verilerini yükleyebilirsiniz
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const addedProductsContainer = document.getElementById('added-products-container');

    addedProductsContainer.innerHTML = ''; // Temizle

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Fiyat: ${product.price} TL</p>
            <button>Sepete Ekle</button>
        `;
        addedProductsContainer.appendChild(productCard);
    });
}
