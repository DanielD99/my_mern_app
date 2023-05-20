const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Handle the error or rethrow it
  }
};

module.exports = connectDB;