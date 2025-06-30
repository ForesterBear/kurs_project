const express = require('express');
const router = express.Router();
const MaintenanceLog = require('../models/maintenanceLog');
const { auth, isAdmin } = require('../middleware/auth');

// Додати запис обслуговування (тільки для адміна)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const log = new MaintenanceLog({
      ...req.body,
      createdBy: req.user._id
    });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: 'Помилка створення запису', error: err.message });
  }
});

// Отримати журнал обслуговування (фільтри: vehicleId, fromDate, toDate, type)
router.get('/', auth, async (req, res) => {
  try {
    const { vehicleId, fromDate, toDate, type } = req.query;
    const filter = {};
    if (vehicleId) filter.vehicleId = vehicleId;
    if (type) filter.type = type;
    if (fromDate || toDate) filter.date = {};
    if (fromDate) filter.date.$gte = new Date(fromDate);
    if (toDate) filter.date.$lte = new Date(toDate);
    const logs = await MaintenanceLog.find(filter).populate('vehicleId').populate('createdBy').sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання журналу', error: err.message });
  }
});

// TODO: Додати GET /alerts, PUT/DELETE за потреби

module.exports = router;
