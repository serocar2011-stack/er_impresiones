import mongoose from 'mongoose';
import User from './src/models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const adminData = {
      name: 'Admin',
      lastName: 'ER',
      email: 'admin@erimpresiones.com',
      password: 'Password123' // Debe cumplir: 1 número, 1 mayúscula, 6-16 caracteres
    };

    const existingUser = await User.findOne({ email: adminData.email });
    if (existingUser) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const newUser = new User(adminData);
    await newUser.save();
    console.log('Admin created successfully');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
