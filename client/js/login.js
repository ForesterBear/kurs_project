// Авторизація користувача
const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
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
