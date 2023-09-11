import mongoose from "mongoose";

const hashSchema = new mongoose.Schema({
  text: { type: String, required: true },
  views: { type: Number, default: 0, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hash",
    },
  ],
  media: [
    {
      url: { type: String },
      alt: { type: String },
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  reposts: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      quote: { type: String }
    }
  ],
});

const Hash = mongoose.models.Hash || mongoose.model("Hash", hashSchema);

export default Hash;
