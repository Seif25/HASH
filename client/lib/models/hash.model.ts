import mongoose from "mongoose";

const hashSchema = new mongoose.Schema({
  text: { type: String, required: true },
  views: { type: Number, default: 0, required: true },
  author: {
    type: String,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
  parentId: { type: String, default: null },
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
      id: { type: String },
    },
  ],
  likes: [
    {
      type: String,
      ref: "User",
    },
  ],
  reposts: [
    {
      user: { type: String, ref: "User" },
      quote: { type: String },
    },
  ],
  tags: [
    {
      type: String,
      ref: "Tag",
      default: [],
    },
  ],
  pinned: { type: Boolean, default: false },
  highlighted: { type: Boolean, default: false },
  bookmarkedBy: [
    {
      type: String,
      ref: "User",
      default: [],
    },
  ],
  restriction: {
    type: String,
    enum: ["everyone", "followers only", "followed by me"],
    default: "everyone",
  },
});

const Hash = mongoose.models.Hash || mongoose.model("Hash", hashSchema);

export default Hash;
