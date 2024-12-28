// Sayfa yüklendiğinde tüm ürünleri göster
document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage'dan ürünler listesini al
    const productList = JSON.parse(localStorage.getItem('productList')) || [];

    // Ürünler listesine eklenenleri göster
    updateProductList(productList);

    // Ürün ekleme formu dinleyicisi
    document.getElementById('productForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Sayfa yenilenmesini engelle

        // Formdaki verileri al
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productImage = document.getElementById('productImage').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);
        const productCategory = document.getElementById('productCategory').value;
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        // Verilerin doğruluğunu kontrol et
        if (productName === '' || productDescription === '' || isNaN(productPrice) || productImage === '' || productCategory === '' || isNaN(productQuantity)) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        // Aynı isimde ürün var mı diye kontrol et
        const existingProduct = productList.find(product => product.productName === productName);

        if (existingProduct) {
            alert('Bu isimde bir ürün zaten mevcut!');
            return; // Aynı isimde ürün varsa eklemeyi engelle
        }

        // Yeni ürünü ekle
        const newProduct = { 
            productName, 
            productDescription, 
            productImage, 
            productPrice, 
            productCategory,
            quantity: productQuantity // Kullanıcının girdiği adet
        };

        // Ürünler listesine ekle
        productList.push(newProduct);

        // LocalStorage'a kaydet
        localStorage.setItem('productList', JSON.stringify(productList));

        // Ürünler listesini güncelle
        updateProductList(productList);

        // Formu temizle
        document.getElementById('productForm').reset();
    });

    // Çıkış yap butonuna tıklandığında admin.html sayfasına yönlendir
    document.getElementById('logoutButton').addEventListener('click', function (e) {
        e.preventDefault(); // Çıkış işlemini engelle
        window.location.href = 'admin.html'; // admin.html sayfasına yönlendir
    });
});

// Ürünler listesini güncelleyen fonksiyon
function updateProductList(productList) {
    const productListElement = document.getElementById('productList');
    productListElement.innerHTML = ''; // Listeyi temizle

    productList.forEach((product, index) => {
        const li = document.createElement('li');
        li.classList.add('product-item');
        li.innerHTML = `
            <img src="${product.productImage}" alt="${product.productName}" class="product-image">
            <div class="product-details">
                <h3>${product.productName}</h3>
                <p>${product.productDescription}</p>
                <p><strong>Fiyat:</strong> ${product.productPrice} ₺</p>
                <p><strong>Kategori:</strong> ${product.productCategory}</p>
                <p><strong>Adet:</strong> ${product.quantity}</p>
            </div>
            <div class="product-actions">
                <button onclick="addToCart('${product.productName}')">Sepete Ekle</button>
            </div>
        `;
        productListElement.appendChild(li);
    });
}

// Sepete ürün ekleme fonksiyonu
function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productList = JSON.parse(localStorage.getItem('productList')) || []; // Ürün listesini al

    // Ürünü 'productName' ile buluyoruz
    const product = productList.find(p => p.productName === productName);

    if (product) {
        // Sepette zaten varsa, miktarını artırıyoruz
        const existingProduct = cart.find(p => p.productName === product.productName);

        if (existingProduct) {
            existingProduct.quantity++; // Miktarı artır
        } else {
            // Sepete yeni ürün ekle
            cart.push({
                productName: product.productName,
                productPrice: product.productPrice,
                quantity: 1, // Sepete eklenen ürünün başlangıç miktarı
                productImage: product.productImage,
                productDescription: product.productDescription,
                productCategory: product.productCategory
            });
        }

        // Sepeti localStorage'a kaydet
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Ürün sepete eklendi!');
    } else {
        alert('Ürün bulunamadı!');
    }
}

// Sepet ürünlerini tutan bir dizi (localStorage'dan sepeti yükle)
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Sepet ürünlerini sayfada gösteren fonksiyon
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Mevcut ürünleri temizleyin

    let totalPrice = 0;

    // Sepet boşsa mesaj göster
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Sepetinizde ürün bulunmamaktadır.</p>';
        document.querySelector('.cart-summary').innerHTML = '<p>Toplam: 0 TL</p>';
        return;
    }

    cartItems.forEach((item, index) => {
        totalPrice += item.productPrice * item.quantity; // Toplam fiyatı hesapla

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.productImage}" alt="${item.productName}">
                <div>
                    <h4>${item.productName}</h4>
                    <p>Fiyat: ${item.productPrice} TL</p>
                    <p>Adet: ${item.quantity}</p>
                </div>
            </div>
            <div class="cart-item-quantity">
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            </div>
            <button onclick="removeItem(${index})">Kaldır</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    // Toplam fiyatı güncelle
    document.querySelector('.cart-summary').innerHTML = `<p>Toplam: ${totalPrice.toFixed(2)} TL</p>`;
}

// Ürün miktarını güncelleme fonksiyonu
function updateQuantity(index, quantity) {
    cartItems[index].quantity = parseInt(quantity);
    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

// Ürünü sepetten kaldırma fonksiyonu
function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCartItems();
}

// Sepeti temizleme fonksiyonu
function clearCart() {
    localStorage.removeItem('cart');
    cartItems = [];
    displayCartItems();
}

// Alışverişi Tamamla fonksiyonu
function checkout() {
    window.location.href = 'checkout.html'; // Kullanıcıyı checkout sayfasına yönlendirir
}

// Sayfa yüklendiğinde sepet ürünlerini göster
document.addEventListener('DOMContentLoaded', displayCartItems);

function checkout() {
    window.location.href = 'bank-list.html'; // Banka bilgileri sayfasına yönlendir
}
