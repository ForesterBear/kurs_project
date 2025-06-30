const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maintenanceLogSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  type: { type: String, enum: ['ТО', 'Ремонт', 'Заміна'], required: true },
  date: { type: Date, required: true },
  description: String,
  mileage: Number,
  nextServiceDate: Date,
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MaintenanceLog', maintenanceLogSchema);
