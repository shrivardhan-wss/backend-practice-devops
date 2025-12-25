import mongoose from "mongoose";

export async function connectDB() {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined");
  }

  await mongoose.connect(MONGO_URL);
  console.log("✅ MongoDB connected");
}
