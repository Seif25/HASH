import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  link: { type: String, required: true },
  type: { type: String, required: true },
  source: { type: String, required: false, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);

export default Notification;
