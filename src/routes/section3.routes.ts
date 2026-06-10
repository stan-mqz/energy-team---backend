// src/routes/section3.routes.ts
import { Router } from "express";
import { getQuestions, validateAnswers, getStats } from "../controllers/section3.controller";

const router = Router();

// Endpoints siguiendo la convención REST del proyecto
router.get("/questions", getQuestions);
router.post("/validate", validateAnswers);
router.get("/stats", getStats);

export default router;