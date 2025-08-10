const express = require('express');
const router = express.Router();
const User = require('../models/User');

//  GET all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
});

// DELETE a patient by ID
router.delete('/patients/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete patient' });
  }
});

//  GET all unapproved doctors
router.get('/pending-doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor', isApproved: false });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch pending doctors' });
  }
});

//  Approve a doctor by ID
router.put('/approve-doctor/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor approved', user: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve doctor' });
  }
});

module.exports = router;
