import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getAdminStats } from "../controllers/adminController.js";
const router=express.Router();
router.get("/stats",protect,authorize("admin"),getAdminStats);
export default router;