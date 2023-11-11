import mongoose from "mongoose";
// import { logger } from "./logs/logger";

// *SETTING UP LOGGER
// logger.defaultMeta = { service: "mongodb" };

export let isConnected = false;

export const initializeMongoConnection = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) return console.error("Failed to load DB URI");
  if (isConnected) return;

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    console.info("Initialized MongoDB Connection Successfully");
  } catch (error) {
    console.error(error);
  }
};
