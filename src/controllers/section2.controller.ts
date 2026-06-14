import { Request, Response } from 'express';
import { GameModel, GameScore } from '../models/section2.model';

export class section2Controller {

    // 🔥 OBTENER PREGUNTAS DESDE LA BD
    static async getGameQuestions(req: Request, res: Response) {

        try {

            const questions = await GameModel.getQuestions();

            return res.status(200).json({
                questions
            });

        } catch (error: any) {

            return res.status(500).json({
                message: "Error al obtener preguntas",
                error: error.message
            });

        }
    }

    // 🔥 PROCESAR RESPUESTAS
    static async submitResults(req: Request, res: Response) {

        try {

            const student_name = req.body.student_name;
            const answers = req.body.answers;

            if (!student_name || !Array.isArray(answers)) {
                return res.status(400).json({
                    message: "Datos de entrada inválidos."
                });
            }

            // 🔥 obtener respuestas correctas desde BD
            const correctAnswersMap = await GameModel.getCorrectAnswers();

            let correctCount = 0;

            for (const ans of answers) {

                const qId = Number(ans.questionId);
                const selected = Number(ans.selectedIndex);

                if (correctAnswersMap[qId] === selected) {

                    correctCount++;

                    // ✅ sumar acierto
                    await GameModel.incrementCorrect(qId);

                } else {

                    // ❌ sumar error
                    await GameModel.incrementIncorrect(qId);

                }
            }

            const finalScore = correctCount * 20;

            const newScore: GameScore = {
                student_name,
                score: finalScore,
                correct_answers: correctCount
            };

            const saved = await GameModel.saveScore(newScore);

            if (saved) {

                return res.status(201).json({
                    message: "¡Puntuación guardada con éxito!",
                    student_name,
                    correct_answers: correctCount,
                    total_score: finalScore
                });

            }

            return res.status(500).json({
                message: "No se pudo guardar la puntuación."
            });

        } catch (error: any) {

            return res.status(500).json({
                message: "Error interno del servidor",
                error: error.message
            });

        }
    }

    // 🔥 LEADERBOARD (si lo usas)
    static async getLeaderboard(req: Request, res: Response) {

        try {

            const leaderboard =
                await GameModel.getLeaderboard();

            return res.status(200).json(leaderboard);

        } catch (error: any) {

            return res.status(500).json({
                message: "Error al obtener el leaderboard",
                error: error.message
            });

        }

    }
}