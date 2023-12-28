import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  image: { type: String },
  banner: { type: String },
  bio: { type: String },
  location: { type: String },
  website: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  verified: { type: Boolean, default: false },
  birthDate: { type: Date },
  hashes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hash",
    },
  ],
  onBoarded: { type: Boolean, default: false },
  following: [
    {
      type: String,
      ref: "User",
      default: [],
    },
  ],
  followers: [
    {
      type: String,
      ref: "User",
      default: [],
    },
  ],
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hash",
    },
  ],
  joinedAt: { type: Date, default: Date.now },
  fcmToken: { type: String },
  blocked: [
    {
      type: String,
      ref: "User",
      default: [],
    },
  ],
  notInterested: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hash",
      default: [],
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
