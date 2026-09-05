import express from "express";
import { getProfessionals, getProfessional } from "../controllers/professionalController.js";
const router=express.Router();
router.get("/",getProfessionals); router.get("/:id",getProfessional);
export default router;