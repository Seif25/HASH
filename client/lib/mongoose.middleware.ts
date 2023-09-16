import mongoose from "mongoose";

export let isConnected = false;

export const initializeMongoConnection = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) return console.log("Failed to load DB URI");
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.log("Successfully connected to DB");
  } catch (error) {
    console.log(error);
  }
};
