import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  pictureUrl: {
    type: String,
    required: false
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  adminIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

CommunitySchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export default CommunitySchema;
