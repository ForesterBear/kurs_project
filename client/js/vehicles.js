// Робота з транспортними засобами
const tableBody = document.querySelector('#vehiclesTable tbody');
const form = document.getElementById('vehicleForm');
const filterInput = document.getElementById('filterInput');

async function fetchUser() {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
        const user = await res.json();
        document.getElementById('userPanel').textContent = `Вітаємо, ${user.name} (${user.role})`;
        if (user.role !== 'admin') {
            document.querySelectorAll('th:last-child, td:last-child').forEach(el => el.style.display = 'none');
        }
    } else {
        window.location.href = 'login.html';
    }
}

async function fetchVehicles() {
    const res = await fetch('/api/vehicles');
    const vehicles = await res.json();
    renderTable(vehicles);
}

function renderTable(vehicles) {
    tableBody.innerHTML = '';
    const filter = filterInput.value.toLowerCase();
    vehicles.filter(v =>
        v.number.toLowerCase().includes(filter) ||
        v.type.toLowerCase().includes(filter) ||
        v.brand.toLowerCase().includes(filter) ||
        v.status.toLowerCase().includes(filter)
    ).forEach(vehicle => {
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
                <button onclick="editVehicle('${vehicle._id}')">Редагувати</button>
                <button onclick="deleteVehicle('${vehicle._id}')">Видалити</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
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

window.editVehicle = async function(id) {
    const newStatus = prompt('Новий стан:');
    if (newStatus) {
        const res = await fetch(`/api/vehicles/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        if (res.ok) fetchVehicles();
        else alert('Помилка редагування');
    }
};

window.deleteVehicle = async function(id) {
    if (confirm('Видалити транспортний засіб?')) {
        const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
        if (res.ok) fetchVehicles();
        else alert('Помилка видалення');
    }
};

filterInput.addEventListener('input', fetchVehicles);

function logout() {
    fetch('/api/auth/logout').then(() => window.location.href = 'login.html');
}

fetchUser();
fetchVehicles();
