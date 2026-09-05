import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getReviews, createReview } from "../controllers/reviewController.js";
const router=express.Router();
router.get("/",getReviews); router.post("/",protect,createReview);
export default router;