import { Request, Response } from 'express';
import { GameModel, GameScore } from '../models/game.model';

export class GameController {
    
    // 1. Obtener preguntas del juego de Transformaciones de la Energía
    static getGameQuestions(_req: Request, res: Response) {
        // Banco de preguntas basado en el tema de Transformaciones de la Energía
        const questions = [
            {
                id: 1,
                question: "¿Qué transformación de energía ocurre principalmente al encender una bombilla o foco?",
                options: [
                    "De energía eléctrica a energía luminosa y térmica.",
                    "De energía química a térmica.",
                    "De energía mecánica a eléctrica."
                ],
                answerIndex: 0
            },
            {
                id: 2,
                question: "¿Qué tipo de energía se transforma en energía mecánica (cinética) cuando un automóvil se mueve?",
                options: [
                    "Energía luminosa.",
                    "Energía química (del combustible).",
                    "Energía nuclear."
                ],
                answerIndex: 1
            },
            {
                id: 3,
                question: "En un panel solar, la luz del sol se transforma directamente en:",
                options: [
                    "Energía mecánica.",
                    "Energía química.",
                    "Energía eléctrica."
                ],
                answerIndex: 2
            },
            {
                id: 4,
                question: "Cuando frotas tus manos para calentarlas en un día frío, ¿qué transformación ocurre?",
                options: [
                    "De energía térmica a mecánica.",
                    "De energía química a eléctrica.",
                    "De energía mecánica a térmica."
                ],
                answerIndex: 2
            }
        ];

        return res.status(200).json({
            unidad: "Unidad 2: Energía",
            semana: "Transformaciones de la energía",
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
            const correctAnswersMap: { [key: number]: number } = { 1: 0, 2: 1, 3: 2, 4: 2 };
            
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
    static async getLeaderboard(_req: Request, res: Response) {
        try {
            const leaderboard = await GameModel.getLeaderboard();       
            return res.status(200).json(leaderboard);
        } catch (error: any) {
            return res.status(500).json({ message: "Error al obtener el leaderboard", error: error.message });
        }
    }
}