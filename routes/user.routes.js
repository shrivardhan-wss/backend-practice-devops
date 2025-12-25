import { Router } from "express";
import user from "../model/user.js";

const router = Router();

// ❌ GET should NOT create data
// ✅ POST creates data
router.post("/test", async (req, res) => {
  const createdUser = await user.create({ name: "John Doe" });
  res.json(createdUser);
});

export default router;
