const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // 👈 fix
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // 👈 fix
  slot: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Declined'], default: 'Pending' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
