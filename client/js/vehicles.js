// Робота з транспортними засобами
const tableBody = document.querySelector('#vehiclesTable tbody');
const form = document.getElementById('vehicleForm');



async function fetchUser() {
    let role = 'user';
    let name = '';
    try {
        const res = await fetch('/api/users/me', { credentials: 'include' });
        if (res.ok) {
            const data = await res.json();
            role = data.role;
        }
    } catch {}
    // Якщо є інший спосіб отримати ім'я користувача — додай тут
    document.getElementById('userPanel').textContent = `Ваша роль: ${role}`;
    // Показати форму та кнопки лише для admin
    if (role === 'admin') {
        document.getElementById('vehicleForm').style.display = '';
        document.querySelectorAll('.edit-btn, .delete-btn').forEach(btn => btn.style.display = 'inline-block');
        const actionsHeader = document.getElementById('actionsHeader');
        if (actionsHeader) actionsHeader.style.display = '';
    } else {
        document.getElementById('vehicleForm').style.display = 'none';
        document.querySelectorAll('.edit-btn, .delete-btn').forEach(btn => btn.style.display = 'none');
        const actionsHeader = document.getElementById('actionsHeader');
        if (actionsHeader) actionsHeader.style.display = 'none';
    }
    return role;
}

async function fetchVehicles() {
    const res = await fetch('/api/vehicles');
    const vehicles = await res.json();
    renderTable(vehicles);
}


function renderTable(vehicles) {
    tableBody.innerHTML = '';
    vehicles.forEach(vehicle => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${vehicle.number}</td>
            <td>${vehicle.type}</td>
            <td>${vehicle.brand}</td>
            <td>${vehicle.model}</td>
            <td>${vehicle.year}</td>
            <td>${vehicle.status}</td>
            <td>${vehicle.responsible}</td>
            <td>
                <button class="edit-btn" style="display:none;" onclick="editVehicle('${vehicle._id}')">Редагувати</button>
                <button class="delete-btn" style="display:none;" onclick="deleteVehicle('${vehicle._id}')">Видалити</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
    // Після рендеру таблиці оновити видимість кнопок згідно ролі
    fetchUser();
}

// --- Фільтрація ---
window.applyFilters = function() {
    const type = document.getElementById("filterType").value.toLowerCase();
    const condition = document.getElementById("filterCondition").value.toLowerCase();
    const search = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#vehiclesTable tbody tr");
    rows.forEach(row => {
        const rowType = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const rowCondition = row.querySelector("td:nth-child(6)").textContent.toLowerCase();
        const fullText = row.textContent.toLowerCase();
        const typeMatch = !type || rowType.includes(type);
        const conditionMatch = !condition || rowCondition.includes(condition);
        const searchMatch = fullText.includes(search);
        if (typeMatch && conditionMatch && searchMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // Валідація марки
    const markaRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ\s-]+$/;
    if (!markaRegex.test(data.brand)) {
        alert("Поле 'Марка' повинно містити лише літери");
        return;
    }
    // Валідація відповідальної особи (ПІБ)
    const pibRegex = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]+$/;
    if (!pibRegex.test(data.responsible)) {
        alert("Поле 'Відповідальна особа' повинно містити лише літери");
        return;
    }
    // Додатково: рік випуску (перевірка формату дати)
    if (!data.year || !/^\d{4}-\d{2}-\d{2}$/.test(data.year)) {
        alert("Поле 'Рік випуску' повинно бути у форматі YYYY-MM-DD");
        return;
    }
    // Відправка на сервер
    const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        form.reset();
        fetchVehicles();
    } else {
        alert('Помилка додавання');
    }
});


// --- Модальне редагування ---
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const closeEditModalBtn = document.getElementById('closeEditModal');
let editingId = null;

window.editVehicle = async function(id) {
    // Отримати дані про транспортний засіб
    const res = await fetch(`/api/vehicles`);
    const vehicles = await res.json();
    const vehicle = vehicles.find(v => v._id === id);
    if (!vehicle) return alert('Транспортний засіб не знайдено');
    // Заповнити форму
    document.getElementById('editNumber').value = vehicle.number;
    document.getElementById('editType').value = vehicle.type;
    document.getElementById('editBrand').value = vehicle.brand;
    document.getElementById('editModel').value = vehicle.model;
    document.getElementById('editYear').value = vehicle.year;
    document.getElementById('editStatus').value = vehicle.status;
    document.getElementById('editResponsible').value = vehicle.responsible;
    editingId = id;
    editModal.style.display = 'block';
};

closeEditModalBtn.onclick = function() {
    editModal.style.display = 'none';
};
window.onclick = function(event) {
    if (event.target === editModal) editModal.style.display = 'none';
};

editForm.onsubmit = async function(e) {
    e.preventDefault();
    // Валідація як при додаванні
    const data = {
        number: document.getElementById('editNumber').value,
        type: document.getElementById('editType').value,
        brand: document.getElementById('editBrand').value,
        model: document.getElementById('editModel').value,
        year: document.getElementById('editYear').value,
        status: document.getElementById('editStatus').value,
        responsible: document.getElementById('editResponsible').value
    };
    const markaRegex = /^[A-Za-zА-Яа-яЇїІіЄєҐґ\s-]+$/;
    if (!markaRegex.test(data.brand)) {
        alert("Поле 'Марка' повинно містити лише літери");
        return;
    }
    const pibRegex = /^[А-Яа-яЇїІіЄєҐґA-Za-z\s'-]+$/;
    if (!pibRegex.test(data.responsible)) {
        alert("Поле 'Відповідальна особа' повинно містити лише літери");
        return;
    }
    if (!data.year || !/^\d{4}-\d{2}-\d{2}$/.test(data.year)) {
        alert("Поле 'Рік випуску' повинно бути у форматі YYYY-MM-DD");
        return;
    }
    // Відправка на сервер
    const res = await fetch(`/api/vehicles/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        editModal.style.display = 'none';
        fetchVehicles();
    } else {
        alert('Помилка редагування');
    }
};

window.deleteVehicle = async function(id) {
    if (confirm('Видалити транспортний засіб?')) {
        const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
        if (res.ok) fetchVehicles();
        else alert('Помилка видалення');
    }
};


function logout() {
    fetch('/api/auth/logout').then(() => window.location.href = 'login.html');
}


fetchUser().then(() => fetchVehicles());
