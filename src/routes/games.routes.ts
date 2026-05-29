import { Router } from 'express';
import { GameController } from '../controllers/game.controller';

const router = Router();

// Endpoint para jalar las preguntas del juego
router.get('/questions', GameController.getGameQuestions);

// Endpoint para recibir los resultados del juego y guardarlos
router.post('/submit', GameController.submitGameResults);

// Endpoint para el tablero de posiciones
router.get('/leaderboard', GameController.getLeaderboard);

export default router;