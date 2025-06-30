// Завантаження списку авто для вибору
async function loadVehicles() {
  const res = await fetch('/api/vehicles');
  const vehicles = await res.json();
  const select = document.getElementById('vehicleSelect');
  const filter = document.getElementById('filterVehicle');
  select.innerHTML = '';
  filter.innerHTML = '<option value="">Всі</option>';
  vehicles.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v._id;
    opt.textContent = v.number + ' ' + v.brand + ' ' + v.model;
    select.appendChild(opt);
    const opt2 = opt.cloneNode(true);
    filter.appendChild(opt2);
  });
}

// Додавання запису
const form = document.getElementById('maintenanceForm');
form.onsubmit = async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (data.nextServiceDate === '') delete data.nextServiceDate;
  const res = await fetch('/api/maintenance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    form.reset();
    loadLogs();
  } else {
    alert('Помилка додавання');
  }
};

// Завантаження журналу
async function loadLogs() {
  const vehicleId = document.getElementById('filterVehicle').value;
  const fromDate = document.getElementById('filterFrom').value;
  const toDate = document.getElementById('filterTo').value;
  let url = '/api/maintenance?';
  if (vehicleId) url += 'vehicleId=' + vehicleId + '&';
  if (fromDate) url += 'fromDate=' + fromDate + '&';
  if (toDate) url += 'toDate=' + toDate + '&';
  const res = await fetch(url);
  const logs = await res.json();
  const tbody = document.querySelector('#maintenanceTable tbody');
  tbody.innerHTML = '';
  logs.forEach(l => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${l.vehicleId ? l.vehicleId.number : ''}</td><td>${l.date ? l.date.slice(0,10) : ''}</td><td>${l.type}</td><td>${l.description||''}</td><td>${l.mileage||''}</td><td>${l.nextServiceDate ? l.nextServiceDate.slice(0,10) : ''}</td><td>${l.createdBy ? l.createdBy.name||l.createdBy.email : ''}</td>`;
    tbody.appendChild(tr);
  });
}

window.onload = () => {
  loadVehicles();
  loadLogs();
};
