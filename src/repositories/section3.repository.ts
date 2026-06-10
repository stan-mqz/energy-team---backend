// src/repositories/section3.repository.ts
import pool from "../config/database";
import { Section3Question } from "../types/section3.types";

// Base de datos en memoria pre-cargada para las preguntas (Tema 3)
const section3Questions: Section3Question[] = [
  {
    id: "t3_q1",
    number: 1,
    question: "¿Por qué es conveniente tomar las cacerolas calientes por el mango?",
    correct_answer: "Porque el mango suele ser de un material aislante térmico que evita que el calor se transfiera a la mano",
    options: [
      "Porque el mango suele ser de un material aislante térmico que evita que el calor se transfiera a la mano",
      "Porque el mango está más frío que el resto de la cacerola al ser más delgado",
      "Porque el mango conduce el calor más rápido y lo disipa antes de llegar a la mano",
      "Porque agarrar el mango requiere menos fuerza y así no se calienta la mano",
    ],
  },
  {
    id: "t3_q2",
    number: 2,
    question: "¿Por qué un sorbete empieza a derretirse después de un tiempo de estar servido?",
    correct_answer: "Porque el entorno está a mayor temperatura y le transfiere energía en forma de calor",
    options: [
      "Porque el entorno está a mayor temperatura y le transfiere energía en forma de calor",
      "Porque el sorbete pierde su energía interna al estar expuesto al aire",
      "Porque el recipiente absorbe el frío del sorbete y lo calienta",
      "Porque la gravedad comprime las moléculas y genera calor dentro del sorbete",
    ],
  },
  {
    id: "t3_q3",
    number: 3,
    question: "¿Qué es la energía térmica?",
    correct_answer: "Es la energía que posee un cuerpo debido al movimiento de las partículas que lo conforman",
    options: [
      "Es la energía que posee un cuerpo debido al movimiento de las partículas que lo conforman",
      "Es la cantidad de calor que un cuerpo puede absorber antes de cambiar de estado",
      "Es la temperatura medida en el interior de un objeto sólido",
      "Es la energía que se genera únicamente cuando dos cuerpos entran en contacto",
    ],
  },
];

export const getQuestionsFromDB = async (): Promise<Section3Question[]> => {
  return [...section3Questions];
};

/**
 * Incrementa el contador de respuestas correctas en MySQL.
 * Utiliza 'ON DUPLICATE KEY UPDATE' para insertar el registro si no existía de antemano.
 */
export const incrementCorrectAnswer = async (questionId: string): Promise<void> => {
  const question = section3Questions.find(q => q.id === questionId);
  const questionNumber = question ? question.number : 0;

  const query = `
    INSERT INTO section3_stats (question_id, number, correct_count, incorrect_count)
    VALUES (?, ?, 1, 0)
    ON DUPLICATE KEY UPDATE correct_count = correct_count + 1;
  `;
  
  await pool.execute(query, [questionId, questionNumber]);
};

/**
 * Incrementa el contador de respuestas incorrectas en MySQL.
 */
export const incrementIncorrectAnswer = async (questionId: string): Promise<void> => {
  const question = section3Questions.find(q => q.id === questionId);
  const questionNumber = question ? question.number : 0;

  const query = `
    INSERT INTO section3_stats (question_id, number, correct_count, incorrect_count)
    VALUES (?, ?, 0, 1)
    ON DUPLICATE KEY UPDATE incorrect_count = incorrect_count + 1;
  `;

  await pool.execute(query, [questionId, questionNumber]);
};

/**
 * Recupera todas las estadísticas agregadas directamente de la Base de Datos.
 */
export const getStatsFromDB = async () => {
  const query = `
    SELECT 
      question_id AS questionId,
      correct_count AS correctCount,
      incorrect_count AS incorrectCount,
      number
    FROM section3_stats
    ORDER BY number ASC;
  `;
  
  const [rows] = await pool.execute(query);
  return rows;
};

export default section3Questions;