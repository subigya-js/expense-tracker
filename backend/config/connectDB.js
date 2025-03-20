const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.log(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
