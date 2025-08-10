const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availableSlots: [String], // e.g., ["2025-07-28 10:00", "2025-07-28 14:00"]
});

module.exports = mongoose.model('Doctor', doctorSchema);
