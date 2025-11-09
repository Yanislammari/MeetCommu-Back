import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  attachmentsUrls: {
    type: [String],
    required: false,
    default: [],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isUpdated: {
    type: Boolean,
    required: false,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

MessageSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export default MessageSchema;
