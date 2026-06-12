import { Router } from "express";
import { Section1Controller } from "../controllers/section1.controller";

const router = Router();

// Endpoint para obtener las preguntas de la sección 1
router.get("/section1/questions", Section1Controller.getGameQuestions);

// Endpoint para recibir y procesar los resultados de la sección 1
router.post("/section1/submit", Section1Controller.submitGameResults);

// Endpoint para el tablero de posiciones de la sección 1
router.get("/section1/leaderboard", Section1Controller.getLeaderboard);

export default router;
