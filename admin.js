// Admin için ürün ekleme, silme, güncelleme işlemleri
document.addEventListener('DOMContentLoaded', function() {
    loadAdminProducts();
});

function loadAdminProducts() {
    // Admin sayfasında yönetilecek ürünleri yükleyin
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const addedProductsContainer = document.getElementById('added-products-container');
    
    addedProductsContainer.innerHTML = ''; // Temizle

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Fiyat: ${product.price} TL</p>
            <button onclick="deleteProduct(${index})">Sil</button>
            <button onclick="updateProduct(${index})">Düzenle</button>
        `;
        addedProductsContainer.appendChild(productCard);
    });
}

function deleteProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadAdminProducts(); // Yeniden yükle
}

function updateProduct(index) {
    // Ürün güncelleme işlevi
    // Burada bir form açabilir veya modal gösterebilirsiniz
}
document.getElementById('logoutButton').addEventListener('click', function() {
    // Çıkış yap butonuna tıklanınca kullanıcıyı ana sayfaya yönlendirelim
    window.location.href = 'index.html'; // Ana sayfaya yönlendir
});
// Ürün ekleme formu ve ürünler bölümü
const productForm = document.getElementById('productForm');
const addedProductsContainer = document.getElementById('added-products-container');

// Mevcut ürünleri yerel depolamadan al
let products = JSON.parse(localStorage.getItem('products')) || [];

// Ürünleri sayfaya yükle
function loadProducts() {
    addedProductsContainer.innerHTML = ''; // Eklenen ürünler için temizle

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Fiyat: ${product.price} TL</p>
            <p>Kategori: ${product.category}</p>
            <p>Adet: ${product.quantity}</p>
            <button onclick="increaseQuantity(${index})">Adet Artır</button>
            <button onclick="decreaseQuantity(${index})">Adet Azalt</button>
            <button onclick="updatePrice(${index})">Fiyat Güncelle</button>
            <button onclick="deleteProduct(${index})">Sil</button>
        `;
        addedProductsContainer.appendChild(productCard);
    });
}

// Yeni ürün ekle
productForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Formun otomatik gönderilmesini engelle
    
    // Formdaki değerleri al
    const newProduct = {
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').value,
        price: document.getElementById('productPrice').value,
        category: document.getElementById('productCategory').value,
        quantity: 1 // Varsayılan ürün adedi 1 olarak ayarla
    };
    
    // Yeni ürünü listeye ekle
    products.push(newProduct);

    // Yerel depolamaya kaydet
    localStorage.setItem('products', JSON.stringify(products));

    // Ürünleri yeniden yükle
    loadProducts();

    // Formu temizle
    productForm.reset();
});

// Ürün silme fonksiyonu
function deleteProduct(index) {
    products.splice(index, 1); // Listeden ürünü kaldır
    localStorage.setItem('products', JSON.stringify(products)); // Güncellenmiş listeyi kaydet
    loadProducts(); // Ürünleri tekrar yükle
}

// Ürün fiyatını güncelleme fonksiyonu
function updatePrice(index) {
    const newPrice = prompt("Yeni fiyatı girin:", products[index].price);
    if (newPrice) {
        products[index].price = newPrice; // Ürünün fiyatını güncelle
        localStorage.setItem('products', JSON.stringify(products)); // Güncellenmiş listeyi kaydet
        loadProducts(); // Ürünleri tekrar yükle
    }
}

// Ürün adedini artırma fonksiyonu
function increaseQuantity(index) {
    products[index].quantity++; // Ürünün adedini artır
    localStorage.setItem('products', JSON.stringify(products)); // Güncellenmiş listeyi kaydet
    loadProducts(); // Ürünleri tekrar yükle
}

// Ürün adedini azaltma fonksiyonu
function decreaseQuantity(index) {
    if (products[index].quantity > 1) {
        products[index].quantity--; // Ürünün adedini azalt
        localStorage.setItem('products', JSON.stringify(products)); // Güncellenmiş listeyi kaydet
        loadProducts(); // Ürünleri tekrar yükle
    } else {
        alert("Ürün adedi 1'den az olamaz.");
    }
}

// Arama fonksiyonu
document.getElementById('searchBox').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));

    // Arama sonucunu liste başına getir
    const sortedProducts = [...filteredProducts, ...products.filter(product => !product.name.toLowerCase().includes(searchTerm))];
    addProducts('all', sortedProducts);
});
function addProducts(category = 'all', productsToShow = products) {
    const productsContainer = document.getElementById('added-products-container');
    productsContainer.innerHTML = ''; // Önce mevcut ürünleri temizleyin

    // Seçili kategoriye göre ürünleri filtrele
    const filteredProducts = category === 'all' ? productsToShow : productsToShow.filter(product => product.category === category);

    filteredProducts.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>${product.price}</strong></p>
            <p>Kategori: ${product.category}</p>
            <button onclick="deleteProduct(${index})">Sil</button>
        `;

        productsContainer.appendChild(productElement);
    });
}

// Sayfa yüklendiğinde ürünleri göster
document.addEventListener('DOMContentLoaded', loadProducts);
