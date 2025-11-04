import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  participantsIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

export default ConversationSchema;
