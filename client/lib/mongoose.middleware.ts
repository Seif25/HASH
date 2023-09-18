import mongoose from "mongoose";
import { logger } from "@/lib/logs/logger";

// *SETTING UP LOGGER
logger.defaultMeta = { service: "mongodb" };

export let isConnected = false;

export const initializeMongoConnection = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) return logger.error("Failed to load DB URI");
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);

    isConnected = true;

    logger.info("Initialized MongoDB Connection Successfully");
  } catch (error) {
    logger.error(error);
  }
};
