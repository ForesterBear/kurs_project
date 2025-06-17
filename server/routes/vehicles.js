// Маршрути для роботи з транспортними засобами
const express = require('express');
const Vehicle = require('../models/vehicle');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Отримати всі транспортні засоби
router.get('/', auth, async (req, res) => {
  const vehicles = await Vehicle.find();
  res.json(vehicles);
});

// Додати транспортний засіб
router.post('/', auth, async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.json(vehicle);
  } catch {
    res.status(400).json({ message: 'Помилка додавання' });
  }
});

// Оновити транспортний засіб (тільки для адміна)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch {
    res.status(400).json({ message: 'Помилка оновлення' });
  }
});

// Видалити транспортний засіб (тільки для адміна)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Видалено' });
  } catch {
    res.status(400).json({ message: 'Помилка видалення' });
  }
});

module.exports = router;
