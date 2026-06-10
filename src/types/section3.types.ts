// src/types/section3.types.ts

export interface Section3Question {
  id: string;
  number: number;
  question: string;
  options?: string[]; // Para preguntas de opción múltiple o selección
  correct_answer: string;
}

export interface UserAnswer {
  questionId: string;
  answer: string;
}

export interface ValidationResult {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
}

export interface Section3Stats {
  questionId: string;
  correctCount: number;
  incorrectCount: number;
}