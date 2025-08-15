import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowRegister(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Doctor Appointment System</h2>

      {user && (
        <div className="mb-3">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {!user && !showRegister && (
        <>
          <Login onLogin={setUser} />
          <p className="mt-2">
            New here?{' '}
            <button className="btn btn-link" onClick={() => setShowRegister(true)}>
              Register here
            </button>
          </p>
        </>
      )}

      {!user && showRegister && (
        <>
          <Register onRegistered={setUser} />
          <p className="mt-2">
            Already have an account?{' '}
            <button className="btn btn-link" onClick={() => setShowRegister(false)}>
              Back to Login
            </button>
          </p>
        </>
      )}

      {user && <Dashboard user={user} />}
    </div>
  );
}

export default App;
