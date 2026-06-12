import { Request, Response } from "express";
import { Section1Model } from "../models/section1.model";

export class Section1Controller {
    // Preguntas del juego
    static getGameQuestions(req: Request, res: Response) {
        const questions = [
            {
                id: 1,
                question: "¿Qué es la energía mecánica?",
                options: [
                    "La suma de energía potencial y cinética.",
                    "La energía que depende solo de la masa.",
                    "La energía que proviene de la electricidad."
                ],
                answerIndex: 0
            },
            {
                id: 2,
                question: "¿Cuál es la unidad de medida de la energía mecánica?",
                options: ["Newton", "Joule", "Watt"],
                answerIndex: 1
            }
        ];
        return res.status(200).json({ questions });
    }

    // Procesar respuestas
    static submitGameResults(req: Request, res: Response) {
        const { student_name, answers } = req.body;
        const correctAnswersMap: { [key: number]: number } = { 1: 0, 2: 1 };

        let correctCount = 0;
        answers.forEach((ans: any) => {
            if (correctAnswersMap[ans.questionId] === ans.selectedIndex) {
                correctCount++;
            }
        });

        const finalScore = correctCount * 50; // 2 preguntas → 100 puntos
        Section1Model.saveScore({
            student_name,
            score: finalScore,
            correct_answers: correctCount
        });

        return res.status(201).json({
            student_name,
            correct_answers: correctCount,
            total_score: finalScore
        });
    }

    // 🚀 Leaderboard (lo que faltaba)
    static async getLeaderboard(req: Request, res: Response) {
        try {
            const leaderboard = await Section1Model.getLeaderboard();
            return res.status(200).json(leaderboard);
        } catch (error: any) {
            return res.status(500).json({
                message: "Error al obtener el leaderboard",
                error: error.message
            });
        }
    }
}
