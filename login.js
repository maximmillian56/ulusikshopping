document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Formun otomatik gönderilmesini engelle

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kullanıcı adı ve şifreyi kontrol et (admin/admin olarak ayarlandı)
    if (username === 'admin' && password === 'adminulusik') {
        // Giriş başarılıysa, admin sayfasına yönlendir
        window.location.href = 'admin.html'; // Admin sayfasına yönlendirme
    } else {
        // Giriş başarısızsa, hata mesajı göster
        alert('Kullanıcı adı veya şifre yanlış!');
    }
});
