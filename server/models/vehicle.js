// Модель транспортного засобу
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  number: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true }, // YYYY-MM-DD
  status: { type: String, required: true },
  responsible: { type: String, required: true }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
