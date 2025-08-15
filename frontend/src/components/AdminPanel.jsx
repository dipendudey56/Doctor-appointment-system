import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [name, setName] = useState('');
  const [spec, setSpec] = useState('');
  const [slots, setSlots] = useState('');

  const loadDoctors = async () => {
    const res = await fetch('/api/doctors');
    const data = await res.json();
    setDoctors(data);
  };

  const loadAppointments = async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    const pendingApps = data.filter(app => app.status === 'Pending');
    setAppointments(pendingApps);
  };

  const loadPatients = async () => {
    const res = await fetch('/api/users/patients');
    const data = await res.json();
    setPatients(data);
  };

  const loadPendingDoctors = async () => {
    const res = await fetch('/api/users/pending-doctors');
    const data = await res.json();
    setPendingDoctors(data);
  };

  const approveDoctor = async (id) => {
    const res = await fetch(`/api/users/approve-doctor/${id}`, {
      method: 'PUT',
    });
    const data = await res.json();

    if (res.ok) {
      alert('Doctor approved');
      loadPendingDoctors();
      loadDoctors();
    } else {
      alert(data.message || 'Approval failed');
    }
  };

  const addDoctor = async () => {
    const res = await fetch('/api/doctors/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        specialization: spec,
        availableSlots: slots.split(',').map(s => s.trim()),
      }),
    });

    if (res.ok) {
      alert('Doctor added');
      setName('');
      setSpec('');
      setSlots('');
      loadDoctors();
    }
  };

  const deletePatient = async (id) => {
    const res = await fetch(`/api/users/patients/${id}`, {
      method: 'DELETE',
    });
    const data = await res.json();

    if (res.ok) {
      alert('Patient deleted');
      loadPatients();
    } else {
      alert(data.message || 'Delete failed');
    }
  };

  const deleteDoctor = async (id) => {
    const res = await fetch(`/api/doctors/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      alert('Doctor deleted');
      loadDoctors();
    } else {
      alert('Delete failed');
    }
  };

  const updateStatus = async (id, status) => {
  const res = await fetch(`/api/appointments/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (res.ok) {
    alert(`Marked as ${status}`);
    loadAppointments();
  } else {
    alert('Failed to update appointment');
  }
};


  useEffect(() => {
    loadDoctors();
    loadAppointments();
    loadPatients();
    loadPendingDoctors();
  }, []);

  return (
    <div>
      <h5>Add Doctor</h5>
      <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input className="form-control mb-2" placeholder="Specialization" value={spec} onChange={e => setSpec(e.target.value)} />
      <input className="form-control mb-2" placeholder="Slots (comma separated)" value={slots} onChange={e => setSlots(e.target.value)} />
      <button className="btn btn-primary mb-3" onClick={addDoctor}>Add Doctor</button>

      <h5>Doctor List</h5>
      <ul className="list-group mb-4">
        {doctors.map((doc) => (
          <li key={doc._id} className="list-group-item d-flex justify-content-between">
            <div>
              {doc.name} ({doc.specialization}) — {doc.availableSlots.join(', ')}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deleteDoctor(doc._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h5 className="mt-4">Pending Doctor Approvals</h5>
      <ul className="list-group mb-4">
        {pendingDoctors.length === 0 ? (
          <p>No pending doctors.</p>
        ) : (
          pendingDoctors.map(doc => (
            <li key={doc._id} className="list-group-item d-flex justify-content-between">
              <div>{doc.name} ({doc.email})</div>
              <button className="btn btn-success btn-sm" onClick={() => approveDoctor(doc._id)}>
                Approve
              </button>
            </li>
          ))
        )}
      </ul>

      <h5 className="mt-4">Patient List</h5>
      <ul className="list-group">
        {patients.map((pat) => (
          <li key={pat._id} className="list-group-item d-flex justify-content-between">
            <div>
              {pat.name} ({pat.email})
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deletePatient(pat._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h5 className="mt-4">Pending Appointments (Admin View)</h5>
      <ul className="list-group">
        {appointments.map(app => (
          <li key={app._id} className="list-group-item d-flex justify-content-between">
            <div>
              Patient: {app.patientId?.name}, Doctor: {app.doctorId?.name}, Slot: {app.slot}
            </div>
            <div>
              <button className="btn btn-success btn-sm me-2" onClick={() => updateStatus(app._id, 'Confirmed')}>Approve</button>
              <button className="btn btn-danger btn-sm" onClick={() => updateStatus(app._id, 'Declined')}>Decline</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;