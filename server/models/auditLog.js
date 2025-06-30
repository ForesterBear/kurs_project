const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditLogSchema = new Schema({
  objectType: { type: String, enum: ['vehicle', 'maintenance'], required: true },
  objectId: { type: Schema.Types.ObjectId, required: true },
  action: { type: String, enum: ['create', 'update', 'delete'], required: true },
  fieldChanged: String,
  oldValue: String,
  newValue: String,
  changedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  changedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
