// Реєстрація користувача
const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // Валідація пароля
    if (!data.password || data.password.length < 8) {
        document.getElementById('registerError').textContent = "Пароль повинен містити щонайменше 8 символів";
        return;
    }
    // Валідація ПІБ
    const pibRegex = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]+$/;
    if (!pibRegex.test(data.name)) {
        document.getElementById('registerError').textContent = "Поле 'П.І.Б' повинно містити лише літери";
        return;
    }
    // Валідація посади
    const posadaRegex = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s]+$/;
    if (!posadaRegex.test(data.position)) {
        document.getElementById('registerError').textContent = "Поле 'Посада' повинно містити лише літери";
        return;
    }
    // Відправка на сервер
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
