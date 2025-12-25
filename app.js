import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import healthCheckRoutes from "./routes/health-check.routes.js";

const app = express();

// ----- GLOBAL MIDDLEWARE -----
app.use(cors());
app.use(express.json());

// ----- ROUTES -----
app.get("/", (req, res) => {
  res.send("Hello World with MongoDB!");
});

app.use("/health", healthCheckRoutes);

app.use("/users", userRoutes);

export default app;
