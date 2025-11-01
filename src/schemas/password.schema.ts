import mongoose from "mongoose";

const PasswordSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: false
  },
  salt: {
    type: String,
    required: false
  }
});

export default PasswordSchema;
