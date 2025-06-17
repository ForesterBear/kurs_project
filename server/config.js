const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vehicles', {
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
