// src/services/section3.service.ts
import { UserAnswer, ValidationResult } from "../types/section3.types";
import {
  getQuestionsFromDB,
  incrementCorrectAnswer,
  incrementIncorrectAnswer,
  getStatsFromDB,
} from "../repositories/section3.repository";

/**
 * Retorna las preguntas del Tema 3 sin exponer la respuesta correcta al cliente
 */
export const getQuestionsService = async () => {
  const questions = await getQuestionsFromDB();
  return questions.map(({ id, number, question, options }) => ({
    id,
    number,
    question,
    options,
  }));
};

/**
 * Valida las respuestas del usuario contra la BD,
 * actualiza los contadores en question_stats y devuelve el resultado
 */
export const validateAnswersService = async (answers: UserAnswer[]) => {
  const correctAnswers = await getQuestionsFromDB();

  let score = 0;
  let correctCount = 0;
  const results: ValidationResult[] = [];

  for (const userAnswer of answers) {
    // Forzar número para evitar fallos por string vs number (ej: "301" !== 301)
    const questionId = Number(userAnswer.questionId);
    const question = correctAnswers.find((q) => q.id === questionId);

    if (!question) continue;

    // Comparación flexible: limpia espacios y mayúsculas
    const normalize = (str: string) => str.trim().toLowerCase();
    const isCorrect =
      normalize(question.correct_answer) === normalize(userAnswer.answer) ||
      normalize(question.correct_answer).includes(normalize(userAnswer.answer));

    results.push({
      questionId,
      selectedAnswer: userAnswer.answer,
      correctAnswer: question.correct_answer,
      correct: isCorrect,
    });

    if (isCorrect) {
      score += 20; // 5 preguntas = 100 puntos máx
      correctCount++;
      await incrementCorrectAnswer(questionId);
    } else {
      await incrementIncorrectAnswer(questionId);
    }
  }

  return {
    results,
    score,
    correctAnswers: correctCount,
    totalQuestions: correctAnswers.length,
  };
};

/**
 * Devuelve las estadísticas por pregunta del Tema 3 desde la BD
 */
export const getStatsService = async () => {
  return await getStatsFromDB();
};