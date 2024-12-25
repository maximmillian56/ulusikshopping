document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage'dan bankalar listesini al
    const bankList = JSON.parse(localStorage.getItem('bankList')) || [];

    // Bankalar listesine eklenenleri göster
    updateBankList(bankList);

    // Banka ve IBAN bilgilerini ekleyen formu dinle              
    document.getElementById('bankForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Sayfanın yenilenmesini engelle

        // Formdaki verileri al
        const bankName = document.getElementById('bankName').value;
        const iban = document.getElementById('iban').value;

        // Verilerin doğruluğunu kontrol et
        if (bankName === '' || iban === '') {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        // Yeni banka bilgisini ekle
        const newBank = { bankName, iban };
        bankList.push(newBank);

        // LocalStorage'da banka listesine ekle
        localStorage.setItem('bankList', JSON.stringify(bankList));

        // Banka listesine eklenenleri güncelle
        updateBankList(bankList);

        // Formu temizle
        document.getElementById('bankForm').reset();
    });

    // Çıkış yap butonuna tıklandığında admin.html sayfasına yönlendir
    document.getElementById('logoutButton').addEventListener('click', function (e) {
        e.preventDefault(); // Çıkış işlemini engelle
        window.location.href = 'admin.html'; // admin.html sayfasına yönlendir
    });
});

// Bankalar listesini güncelleyen fonksiyon
function updateBankList(bankList) {
    const bankListElement = document.getElementById('bankList');
    bankListElement.innerHTML = '';

    bankList.forEach((bank, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${bank.bankName}</strong> - ${bank.iban}
            <button onclick="editBank(${index})">Güncelle</button>
            <button onclick="deleteBank(${index})">Sil</button>
        `;
        bankListElement.appendChild(li);
    });
}

// Banka bilgisini düzenleyen fonksiyon
function editBank(index) {
    const bankList = JSON.parse(localStorage.getItem('bankList')) || [];
    const bank = bankList[index];

    // Düzenleme formuna mevcut bankayı yerleştir
    document.getElementById('bankName').value = bank.bankName;
    document.getElementById('iban').value = bank.iban;

    // Düzenleme işlemi yapılacaksa banka bilgilerini güncelle
    document.getElementById('bankForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const newBankName = document.getElementById('bankName').value;
        const newIban = document.getElementById('iban').value;

        if (newBankName === '' || newIban === '') {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        bankList[index] = { bankName: newBankName, iban: newIban };

        // Güncellenen listeyi localStorage'a kaydet
        localStorage.setItem('bankList', JSON.stringify(bankList));

        // Listeyi güncelle
        updateBankList(bankList);

        // Formu temizle
        document.getElementById('bankForm').reset();
    });
}

// Banka bilgisini silen fonksiyon
function deleteBank(index) {
    const bankList = JSON.parse(localStorage.getItem('bankList')) || [];
    bankList.splice(index, 1);

    // Silinen listeyi localStorage'a kaydet
    localStorage.setItem('bankList', JSON.stringify(bankList));

    // Listeyi güncelle
    updateBankList(bankList);
}
