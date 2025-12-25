import { Router } from "express";
import mongoose from "mongoose";

const router = Router();

/**
 * GET /health
 * - 200 → service healthy
 * - 503 → unhealthy (DB down)
 */
router.get("/", (req, res) => {
  const dbState = mongoose.connection.readyState;

  /**
   * 0 = disconnected
   * 1 = connected
   * 2 = connecting
   * 3 = disconnecting
   */
  const isDbHealthy = dbState === 1;

  const statusCode = isDbHealthy ? 200 : 503;

  res.status(statusCode).json({
    status: isDbHealthy ? "ok" : "degraded",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    checks: {
      database: isDbHealthy ? "up" : "down",
    },
    message: {
      "Database connection state": dbState ? "connected" : "not connected",
    },
  });
});

export default router;
