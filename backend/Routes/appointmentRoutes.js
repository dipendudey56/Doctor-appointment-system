const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // ✅ Missing import

const {
  bookAppointment,
  updateAppointmentStatus,
  getAllAppointments
} = require('../controllers/appointmentController');

//  Book new appointment
router.post('/book', bookAppointment);

//  Update appointment status (admin/doctor)
router.put('/update/:id', async (req, res) => {
  const { status } = req.body;

  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Update failed:', err); // ✅ Add for debugging
    res.status(500).json({ message: 'Failed to update appointment' });
  }
});

//  Get appointments for a specific doctor
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patientId doctorId'); // must populate for names
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
});


// Get latest appointment by patient ID
router.get('/latest/:patientId', async (req, res) => {
  try {
    const latest = await Appointment.findOne({ patientId: req.params.patientId })
      .sort({ _id: -1 }) // newest first
      .populate('doctorId patientId');

    if (!latest) {
      return res.json(null); // no appointment yet
    }

    res.json(latest);
  } catch (err) {
    console.error('Latest fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch latest appointment' });
  }
});

module.exports = router;
