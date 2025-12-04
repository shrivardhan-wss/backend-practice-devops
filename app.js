import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import user from "./model/user.js";

const app = express();
const port = 3333;

// ----- CONNECT TO MONGODB -----
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/sampleDb/dockerPractice";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

// ----- ROUTES -----
app.get("/", cors(), (req, res) => {
  res.send("Hello World with MongoDB!");
});

app.get("/test", async (req, res) => {
  const users = await user.create({ name: "John Doe" });
  res.send(users);
});

// ----- START SERVER -----
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
