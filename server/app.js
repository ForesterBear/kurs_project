// Головний файл сервера
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const config = require('./config');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Підключення до MongoDB
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB підключено'))
  .catch(err => console.error('MongoDB помилка:', err));

// API маршрути
app.use('/api/auth', require('./routes/auth'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/users', require('./routes/users'));

// Видача статичних файлів (фронтенд)
app.use(express.static(path.join(__dirname, '../client')));

// Запуск сервера
app.listen(config.port, () => {
  console.log(`Сервер запущено на порту ${config.port}`);
});
