const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'doctor', 'patient'], default: 'patient' },
  isApproved: { type: Boolean, default: true } // false for new doctors
});


module.exports = mongoose.model('User', userSchema);
