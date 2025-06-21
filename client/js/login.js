// Авторизація користувача
const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.password || data.password.length < 8) {
        document.getElementById('loginError').textContent = "Пароль повинен містити щонайменше 8 символів";
        return;
    }
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
        window.location.href = 'vehicles.html';
    } else {
        document.getElementById('loginError').textContent = result.message || 'Помилка входу';
    }
});
