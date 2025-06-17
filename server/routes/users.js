// Маршрути для керування користувачами (зміна ролі)
const express = require('express');
const User = require('../models/user');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Змінити роль користувача (тільки для адміна)
router.put('/role/:id', auth, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true });
    res.json(user);
  } catch {
    res.status(400).json({ message: 'Помилка зміни ролі' });
  }
});

module.exports = router;
