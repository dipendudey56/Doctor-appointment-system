const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// Book appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, slot } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor.availableSlots.includes(slot)) {
      return res.status(400).json({ message: "Slot not available" });
    }

    const appointment = new Appointment({ patientId, doctorId, slot });
    await appointment.save();

    // Optional: Remove slot from doctor availability
    doctor.availableSlots = doctor.availableSlots.filter(s => s !== slot);
    await doctor.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Confirm or decline
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    appointment.status = status;
    await appointment.save();

    console.log(`🔔 Notification: Appointment ${status} for ID: ${id}`);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate('patientId', 'name email')
    .populate('doctorId', 'name specialization');
  res.json(appointments);
};
