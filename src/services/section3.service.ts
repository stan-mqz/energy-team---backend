// src/services/section3.service.ts
import { UserAnswer, ValidationResult } from "../types/section3.types";
import { 
  getQuestionsFromDB, 
  incrementCorrectAnswer, 
  incrementIncorrectAnswer,
  getStatsFromDB 
} from "../repositories/section3.repository";

export const getQuestionsService = async () => {
  // Retornamos las preguntas omitiendo la respuesta correcta en el listado inicial
  const questions = await getQuestionsFromDB();
  return questions.map(({ id, question, options }) => ({ id, question, options }));
};

export const validateAnswersService = async (answers: UserAnswer[]) => {
  const correctAnswers = await getQuestionsFromDB();
  let score = 0;
  let correctCount = 0;
  const results: ValidationResult[] = [];

  for (const userAnswer of answers) {
    const question = correctAnswers.find(q => q.id === userAnswer.questionId);
    
    if (!question) continue;

    // Comparación flexible limpiando espacios y mayúsculas
    const isCorrect = question.correct_answer.trim().toLowerCase() === userAnswer.answer.trim().toLowerCase() ||
                      question.correct_answer.trim().toLowerCase().includes(userAnswer.answer.trim().toLowerCase());

    results.push({
      questionId: userAnswer.questionId,
      selectedAnswer: userAnswer.answer,
      correctAnswer: question.correct_answer,
      correct: isCorrect
    });

    if (isCorrect) {
      score += 20; // 5 preguntas = 100 puntos max
      correctCount++;
      await incrementCorrectAnswer(userAnswer.questionId);
    } else {
      await incrementIncorrectAnswer(userAnswer.questionId);
    }
  }

  return {
    results,
    score,
    correctAnswers: correctCount,
    totalQuestions: correctAnswers.length
  };
};

export const getStatsService = async () => {
  return await getStatsFromDB();
};