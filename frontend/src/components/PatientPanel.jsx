import React, { useEffect, useState } from 'react';

function PatientPanel() {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(null);
    }
  }, []);

  const fetchDoctors = async () => {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    setDoctors(data);
  };

  const fetchLatest = async () => {
    if (!user || !user._id) return;

    const res = await fetch(`/api/appointments/latest/${user._id}`);
    const data = await res.json();
    setLatest(data);
  };

  useEffect(() => {
    if (user) {
      fetchDoctors();
      fetchLatest();
      setLoading(false);
    }
  }, [user]);

  const bookAppointment = async (doctorId, slot) => {
    const res = await fetch('/api/appointments/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: user._id,
        doctorId,
        slot
      })
    });

    const data = await res.json();
    if (res.ok) {
      alert('Appointment request sent.');
      fetchLatest(); // reload latest status
    } else {
      alert(data.message || 'Failed to book appointment');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p className="alert alert-danger">⚠ Please log in to view this page.</p>;

  return (
    <div>
      <h5>Welcome, {user?.name}</h5>

      {latest ? (
        <div className="alert alert-info">
          Your last appointment with Dr. <strong>{latest.doctorId?.name}</strong> ({latest.slot}) is{' '}
          <strong>{latest.status}</strong>.
        </div>
      ) : (
        <p>You have no appointments yet.</p>
      )}

      <h6>Book New Appointment</h6>
      <ul className="list-group">
        {doctors.map(doc => (
          <li key={doc._id} className="list-group-item d-flex justify-content-between">
            <div>
              Dr. {doc.name} ({doc.specialization}) — Slots: {doc.availableSlots.join(', ')}
            </div>
            <button
              className="btn btn-primary btn-sm"
              disabled={latest?.status === 'Pending'}
              onClick={() => bookAppointment(doc._id, doc.availableSlots[0])} // 📌 You can enhance slot picker later
            >
              {latest?.status === 'Pending' ? 'Awaiting approval...' : 'Book'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientPanel;
