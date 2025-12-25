import app from "./app.js";
import { connectDB } from "./config/db.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3333;

(async function bootstrap() {
  try {
    await connectDB();

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // ----- GRACEFUL SHUTDOWN -----
    const shutdown = async (signal) => {
      console.log(`\n⚠️  Received ${signal}. Shutting down...`);
      await mongoose.connection.close();
      server.close(() => {
        console.log("💀 Server closed cleanly");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})();
