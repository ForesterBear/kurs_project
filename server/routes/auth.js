// Маршрути для авторизації та реєстрації
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Реєстрація
router.post('/register', async (req, res) => {
  try {
    const { login, password, name, position, department } = req.body;
    if (!login || !password) return res.status(400).json({ message: 'Введіть логін і пароль' });
    const exists = await User.findOne({ login });
    if (exists) return res.status(400).json({ message: 'Користувач вже існує' });
    const hash = await bcrypt.hash(password, 10);
    let role = 'user';
    if ((await User.countDocuments()) === 0) role = 'admin'; // Перший користувач — адміністратор
    const user = await User.create({ login, password: hash, name, position, department, role });
    res.json({ message: 'Реєстрація успішна' });
  } catch {
    res.status(500).json({ message: 'Помилка сервера' }); 
  }
});

// Вхід
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) return res.status(400).json({ message: 'Невірний логін або пароль' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Невірний логін або пароль' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey');
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Вхід успішний' });
  } catch {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// Вихід
router.get('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Вихід' });
});

// Дані про поточного користувача
const { auth } = require('../middleware/auth');
router.get('/me', auth, (req, res) => {
  res.json({ name: req.user.name, role: req.user.role });
});

module.exports = router;
