import mongoose from "mongoose";
import logger from "./logger.util";

const connectDB = async (url, retries = 5, retryDelay = 5000) => {
  const options = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 30000, // Increased from 5s to 30s for production
    socketTimeoutMS: 45000,
    retryWrites: true,
    retryReads: true,
  };

  // Set up connection event listeners
  mongoose.connection.on("connected", () => {
    logger.info("MongoDB connection established successfully");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB reconnected");
  });

  // Retry logic for initial connection
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(
        `Attempting to connect to MongoDB (attempt ${attempt}/${retries})...`
      );
      const connection = await mongoose.connect(url, options);
      return connection;
    } catch (error) {
      logger.error(`MongoDB connection attempt ${attempt} failed:`, error);

      if (attempt === retries) {
        logger.error("All MongoDB connection attempts failed");
        throw error;
      }

      logger.info(`Retrying in ${retryDelay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  throw new Error("Failed to connect to MongoDB after all retries");
};

export default connectDB;
