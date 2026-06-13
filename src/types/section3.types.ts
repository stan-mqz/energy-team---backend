// src/types/section3.types.ts

export interface Section3Question {
  id: number;
  number: number;
  question: string;
  options?: string[];
  correct_answer: string;
}

export interface UserAnswer {
  questionId: number;
  answer: string;
}

export interface ValidationResult {
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  correct: boolean;
}

export interface Section3Stats {
  questionId: number;
  question: string;
  correctCount: number;
  incorrectCount: number;
  success_rate: number;
  number: number;
}