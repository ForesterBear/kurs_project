const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB підключено'))
.catch(err => console.error('Помилка підключення до MongoDB:', err));

// Конфігурація підключення до MongoDB
module.exports = {
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/vehiclesdb',
  port: process.env.PORT || 3000
};

// Scripts
"scripts": {
  "start": "node app.js"
}
