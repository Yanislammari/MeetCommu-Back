import mongoose from "mongoose";
import ConversationType from "../models/conversation.type";

const ConversationSchema = new mongoose.Schema({
  participantsIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  },
  messagesIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Message",
    required: true,
    default: [],
  },
  type: {
    type: String,
    enum: Object.values(ConversationType),
    required: true,
  },
  title: {
    type: String,
    required: false,
    trim: true,
  },
  pictureUrl: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

export default ConversationSchema;
