import React, { useEffect, useState } from 'react';

function DoctorPanel({ user }) {
  const [appointments, setAppointments] = useState([]);

const loadAppointments = async () => {
  if (!user || !user._id) return;

  const res = await fetch('/api/appointments');
  const data = await res.json();

  // ✅ Safe filtering (prevents null crashes)
  const myAppointments = data.filter(app =>
    app?.doctorId?._id && app.doctorId._id === user._id
  );

  setAppointments(myAppointments);
};


  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/appointments/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      alert(`Marked as ${status}`);
      loadAppointments();
    } else {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <div>
      <h5>Your Appointments</h5>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul className="list-group">
          {appointments.map(app => (
            <li key={app._id} className="list-group-item d-flex justify-content-between">
              <span>
                Patient: <strong>{app.patientId?.name}</strong> — Slot: {app.slot} — Status: {app.status}
              </span>
              {app.status === 'Pending' && (
                <span>
                  <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(app._id, 'Confirmed')}>Accept</button>
                  <button className="btn btn-danger btn-sm" onClick={() => updateStatus(app._id, 'Declined')}>Decline</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorPanel;
