import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to DB');
};

const seed = async () => {
  await connectDB();

  await User.deleteMany();

  await User.insertMany([
    { name: 'Dipendu', email: 'dipendu@example.com', password: 'dipendu123', role: 'patient' },
    { name: 'Dr. Sen', email: 'drsen@example.com', password: 'doctor123', role: 'doctor' },
    { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { name: 'Dr. Nayanmoni', email: 'drdey@example.com', password: 'doctor123', role: 'doctor'}
  ]);

  console.log('✅ Users seeded');
  mongoose.connection.close();
};

seed();
