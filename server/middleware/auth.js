// Middleware для перевірки авторизації та ролі
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Необхідна авторизація' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: 'Невірний токен' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ заборонено' });
  next();
};

module.exports = { auth, isAdmin };
