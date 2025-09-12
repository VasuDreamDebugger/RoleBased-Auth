require("dotenv").config();

const mongoose = require("mongoose");

const ConnectDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed", error.stack);
  }
};


module.exports=ConnectDatabase;