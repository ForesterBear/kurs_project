// Модель транспортного засобу
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  number: String,
  type: String,
  brand: String,
  model: String,
  year: Number,
  status: String,
  responsible: String
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
