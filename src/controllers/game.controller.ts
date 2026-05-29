import { Request, Response } from 'express';
import { GameModel, GameScore } from '../models/game.model';

export class GameController {
    
    // 1. Obtener preguntas del juego de Energía Mecánica (Semana 7)
    static getGameQuestions(req: Request, res: Response) {
        // Banco de preguntas basado estrictamente en el libro de texto (Semana 7)
        const questions = [
            {
                id: 1,
                question: "¿De qué factores depende principalmente la energía mecánica?",
                options: [
                    "De la temperatura y el color del objeto.",
                    "De la ubicación (altura) y del movimiento del objeto.",
                    "Únicamente de la masa en reposo."
                ],
                answerIndex: 1 // Segunda opción [cite: 17, 18]
            },
            {
                id: 2,
                question: "Si lanzas una esfera de plastilina desde el doble de altura (60 cm en vez de 30 cm), ¿qué sucede con el agua del vaso?",
                options: [
                    "El agua derramada disminuye.",
                    "El nivel del agua se mantiene exactamente igual.",
                    "Se derrama más agua porque la esfera impacta con mayor energía."
                ],
                answerIndex: 2 // Tercera opción [cite: 13, 15, 18]
            },
            {
                id: 3,
                question: "¿Cómo se llama la energía mecánica que posee un cuerpo debido a su altura o posición?",
                options: [
                    "Energía potencial.",
                    "Energía cinética.",
                    "Energía térmica."
                ],
                answerIndex: 0 // Primera opción [cite: 18]
            },
            {
                id: 4,
                question: "Cuando un objeto se encuentra en movimiento libre, ¿cómo se le conoce a su energía mecánica?",
                options: [
                    "Energía elástica.",
                    "Energía cinética.",
                    "Energía estática."
                ],
                answerIndex: 1 // Segunda opción [cite: 19]
            }
        ];

        return res.status(200).json({
            unidad: "Unidad 2: Energía",
            semana: "Semana 7 — Energía mecánica",
            questions
        });
    }

    // 2. Procesar respuestas y guardar el puntaje final
    static async submitGameResults(req: Request, res: Response) {
        try {
            const { student_name, answers } = req.body; // 'answers' es un array de objetos: { questionId: number, selectedIndex: number }

            if (!student_name || !Array.isArray(answers)) {
                return res.status(400).json({ message: "Datos de entrada inválidos." });
            }

            // Respuestas correctas del backend para validar de forma segura
            const correctAnswersMap: { [key: number]: number } = { 1: 1, 2: 2, 3: 0, 4: 1 };
            
            let correctCount = 0;
            answers.forEach((ans: any) => {
                if (correctAnswersMap[ans.questionId] === ans.selectedIndex) {
                    correctCount++;
                }
            });

            // Cada respuesta correcta otorga 25 puntos (Base 100 max)
            const finalScore = correctCount * 25;

            const newScore: GameScore = {
                student_name,
                score: finalScore,
                correct_answers: correctCount
            };

            // Guardar en MySQL a través del Modelo
            const saved = await GameModel.saveScore(newScore);

            if (saved) {
                return res.status(201).json({
                    message: "¡Puntuación guardada con éxito!",
                    student_name,
                    correct_answers: correctCount,
                    total_score: finalScore
                });
            } else {
                return res.status(500).json({ message: "No se pudo guardar la puntuación." });
            }

        } catch (error: any) {
            return res.status(500).json({ message: "Error interno del servidor", error: error.message });
        }
    }

    // 3. Obtener tabla de posiciones
    static async getLeaderboard(req: Request, res: Response) {
        try {
            const leaderboard = await GameModel.getLeaderboard();       
            return res.status(200).json(leaderboard);
        } catch (error: any) {
            return res.status(500).json({ message: "Error al obtener el leaderboard", error: error.message });
        }
    }
}