import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyBookings, createBooking, updateBookingStatus } from "../controllers/bookingController.js";
const router=express.Router();
router.get("/my",protect,getMyBookings); router.post("/",protect,createBooking); router.put("/:id/status",protect,updateBookingStatus);
export default router;