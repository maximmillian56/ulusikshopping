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
                <button onclick="updateQuantity(${index})">Adet Güncelle</button>
                <button onclick="updatePrice(${index})">Fiyat Güncelle</button>
                <button onclick="deleteProduct(${index})">Sil</button>
            </div>
        `;
        productListElement.appendChild(li);
    });
}

// Arama fonksiyonu
function searchProduct() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase(); // Arama çubuğundaki değeri al
    const productList = JSON.parse(localStorage.getItem('productList')) || [];

    // Ürünleri arama sorgusuna göre filtrele
    const filteredProducts = productList.filter(product => product.productName.toLowerCase().includes(searchQuery));

    // Filtrelenmiş ürünleri güncelle
    updateProductList(filteredProducts);
}

// Adet güncelleme fonksiyonu
function updateQuantity(index) {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    const newQuantity = prompt("Yeni adet miktarını girin:", productList[index].quantity);

    if (newQuantity !== null && !isNaN(newQuantity) && newQuantity >= 0) {
        productList[index].quantity = parseInt(newQuantity);
        localStorage.setItem('productList', JSON.stringify(productList));
        updateProductList(productList);
    } else {
        alert("Geçersiz adet miktarı!");
    }  
}  

// Fiyat güncelleme fonksiyonu
function updatePrice(index) {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    const newPrice = prompt("Yeni fiyatı girin:", productList[index].productPrice);

    if (newPrice !== null && !isNaN(newPrice) && newPrice >= 0) {
        productList[index].productPrice = parseFloat(newPrice);
        localStorage.setItem('productList', JSON.stringify(productList));
        updateProductList(productList);
    } else {
        alert("Geçersiz fiyat!");
    }
}

// Ürün silme fonksiyonu
function deleteProduct(index) {
    const productList = JSON.parse(localStorage.getItem('productList')) || [];
    productList.splice(index, 1); // Belirli indeksteki ürünü sil
    localStorage.setItem('productList', JSON.stringify(productList)); // Güncellenmiş listeyi kaydet
    updateProductList(productList); // Ürünler listesini güncelle
}
