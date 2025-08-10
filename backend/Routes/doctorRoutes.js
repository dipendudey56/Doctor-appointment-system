const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load doctors' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, specialization, availableSlots } = req.body;

    if (!name || !specialization || !availableSlots) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const doctor = new Doctor({ name, specialization, availableSlots });
    await doctor.save();

    res.status(201).json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
