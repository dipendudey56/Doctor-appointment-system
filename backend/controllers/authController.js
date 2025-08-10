const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const isApproved = role === 'doctor' ? false : true;

  const user = new User({ name, email, password, role, isApproved });
  await user.save();

  res.status(201).json({ message: 'Registration submitted', user });
};



exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password)
    return res.status(401).json({ message: 'Invalid credentials' });

  // ✅ Block unapproved doctors
  if (user.role === 'doctor' && !user.isApproved)
    return res.status(403).json({ message: 'Doctor account pending approval' });

  res.json({ message: 'Login success', user });
};

