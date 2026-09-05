import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getUsers, updateUser } from "../controllers/userController.js";
const router=express.Router();
router.get("/",protect,authorize("admin"),getUsers);
router.put("/:id",protect,updateUser);
export default router;