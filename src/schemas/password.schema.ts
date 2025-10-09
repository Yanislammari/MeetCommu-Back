import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

export default PasswordSchema;
