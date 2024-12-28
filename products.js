document.addEventListener('DOMContentLoaded', () => {
    addProducts('all'); // Tüm ürünleri göster
    setupSearch(); // Arama fonksiyonunu başlat
});

// Ürünleri sayfaya ekleyen fonksiyon
function addProducts(category = 'all', searchQuery = '') {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Önce mevcut ürünleri temizle

    const products = JSON.parse(localStorage.getItem('productList')) || []; // Ürünleri localStorage'dan al

    // Seçili kategoriye göre ürünleri filtrele
    const filteredProducts = category === 'all' 
        ? products.filter(product => product.productName.toLowerCase().includes(searchQuery.toLowerCase())) 
        : products.filter(product => product.productCategory === category && product.productName.toLowerCase().includes(searchQuery.toLowerCase()));

    filteredProducts.forEach((product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <img src="${product.productImage}" alt="${product.productName}">
            <h3>${product.productName}</h3>
            <p>${product.productDescription}</p>
            <p><strong>Fiyat: ${product.productPrice} ₺</strong></p>
            <button onclick="addToCart('${product.productName}')">Sepete Ekle</button>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Kategoriye göre filtreleme fonksiyonu
function filterProducts(category) {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value; // Arama kutusundaki sorguyu al
    addProducts(category, searchQuery); // Kategori ve arama sorgusuna göre ürünleri filtrele
}

// Sepete ürün ekleme fonksiyonu
function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = JSON.parse(localStorage.getItem('productList')).find(p => p.productName === productName);

    if (product) {
        const existingProduct = cart.find(p => p.productName === product.productName);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Sepeti localStorage'a kaydet
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Ürün sepete eklendi!');
    }
}

// Arama fonksiyonunu başlatan fonksiyon
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const searchQuery = searchInput.value;
        addProducts('all', searchQuery); // Arama sorgusuna göre ürünleri ekle
    });
}
