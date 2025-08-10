const Patient = require('../models/Patient');

// Register patient
exports.registerPatient = async (req, res) => {
  try {
    const { name, email } = req.body;
    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const patient = new Patient({ name, email });
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all patients (optional)
exports.getAllPatients = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};
