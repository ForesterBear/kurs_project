// Реєстрація користувача
const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    if (res.ok) {
        window.location.href = 'login.html';
    } else {
        document.getElementById('registerError').textContent = result.message || 'Помилка реєстрації';
    }
});
