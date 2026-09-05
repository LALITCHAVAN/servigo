import express from "express";
import { getServices, getService } from "../controllers/serviceController.js";
const router=express.Router();
router.get("/",getServices); router.get("/:slug",getService);
export default router;