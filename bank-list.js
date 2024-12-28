document.addEventListener('DOMContentLoaded', () => {
    const bankListElement = document.getElementById('bankList');
    const bankList = JSON.parse(localStorage.getItem('bankList')) || [];

    if (bankList.length === 0) {
        bankListElement.innerHTML = '<li>Henüz banka ve IBAN bilgisi eklenmemiş.</li>';
        return;
    }

    bankList.forEach((bank) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${bank.bankName}</strong> - ${bank.iban}
        `;
        bankListElement.appendChild(li);
    });
});
