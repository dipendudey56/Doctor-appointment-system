import React, { useState } from 'react';

function Register({ onRegistered }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');

  const register = async () => {
    if (!name || !email || !password) {
      return alert('Please fill all fields');
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user)); // ✅ store the user
      alert('Registered successfully');
      onRegistered(data.user); // callback to parent
    } else {
      alert(data.message || 'Registration failed');
    }
  }; // ✅ <<< this was missing

  return (
    <div>
      <h4>Register</h4>
      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="form-control mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <select
        className="form-control mb-3"
        value={role}
        onChange={e => setRole(e.target.value)}
      >
        <option value="patient">Patient</option>
        <option value="doctor">Doctor</option>
      </select>

      <button className="btn btn-success" onClick={register}>Register</button>
    </div>
  );
}

export default Register;
