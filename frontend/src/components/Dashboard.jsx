import React from 'react';
import PatientPanel from './PatientPanel';
import DoctorPanel from './DoctorPanel';
import AdminPanel from './AdminPanel';

function Dashboard({ user }) {
  return (
    <>
      {user.role === 'patient' && <PatientPanel user={user} />}
      {user.role === 'doctor' && <DoctorPanel user={user} />}
      {user.role === 'admin' && <AdminPanel user={user} />}
    </>
  );
}

export default Dashboard;
