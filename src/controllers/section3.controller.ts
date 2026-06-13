// src/controllers/section3.controller.ts
import { Request, Response } from "express";
import {
  getQuestionsService,
  validateAnswersService,
  getStatsService,
} from "../services/section3.service";

export const getQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questions = await getQuestionsService();
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las preguntas de Energía Térmica." });
  }
};

export const validateAnswers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      res.status(400).json({ message: "Formato de respuestas inválido." });
      return;
    }

    const evaluation = await validateAnswersService(answers);
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: "Error al validar las respuestas." });
  }
};

export const getStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const stats = await getStatsService();
    res.status(200).json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al recopilar las estadísticas." });
  }
};