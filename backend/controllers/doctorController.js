const Doctor = require('../models/Doctor');

// Add a doctor (mock or admin use)
exports.addDoctor = async (req, res) => {
  try {
    const { name, specialization, availableSlots } = req.body;
    const doctor = new Doctor({ name, specialization, availableSlots });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};
