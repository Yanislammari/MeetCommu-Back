import mongoose from "mongoose";
import PasswordSchema from "./password.schema";
import Role from "../models/role";
import Visibility from "../models/visibility";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: PasswordSchema,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.USER,
    required: true
  },
  visibility: {
    type: String,
    enum: Object.values(Visibility),
    default: Visibility.PUBLIC,
    required: true
  },
  profilePictureUrl: {
    type: String,
    required: false
  }
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export default UserSchema;
