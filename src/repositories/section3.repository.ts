// src/repositories/section3.repository.ts
import { RowDataPacket } from "mysql2";
import pool from "../config/database";

interface DBQuestion extends RowDataPacket {
  id: number;
  topic: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  correct_answer: string;
}

/**
 * Obtiene todas las preguntas del Tema 3 (thermal) desde la base de datos
 */
export const getQuestionsFromDB = async (): Promise<any[]> => {
  const [rows] = await pool.query<DBQuestion[]>(`
    SELECT id, topic, question, option_a, option_b, option_c, correct_answer
    FROM questions
    WHERE topic = 'thermal'
    ORDER BY id ASC
  `);

  return rows.map((row) => ({
    id: row.id,
    number: row.id - 300, // Genera número de pregunta relativo (1, 2, 3...)
    question: row.question,
    correct_answer: row.correct_answer,
    options: [row.option_a, row.option_b, row.option_c],
  }));
};

/**
 * Incrementa el contador de respuestas correctas en question_stats.
 * Si aún no existe la fila para ese question_id, la crea automáticamente.
 */
export const incrementCorrectAnswer = async (
  questionId: number
): Promise<void> => {
  await pool.query(
    `
    INSERT INTO question_stats (question_id, correct_count, incorrect_count)
    VALUES (?, 1, 0)
    ON DUPLICATE KEY UPDATE correct_count = correct_count + 1
    `,
    [questionId]
  );
};

/**
 * Incrementa el contador de respuestas incorrectas en question_stats.
 * Si aún no existe la fila para ese question_id, la crea automáticamente.
 */
export const incrementIncorrectAnswer = async (
  questionId: number
): Promise<void> => {
  await pool.query(
    `
    INSERT INTO question_stats (question_id, correct_count, incorrect_count)
    VALUES (?, 0, 1)
    ON DUPLICATE KEY UPDATE incorrect_count = incorrect_count + 1
    `,
    [questionId]
  );
};

/**
 * Recupera las estadísticas del Tema 3 (thermal) desde MySQL
 */
export const getStatsFromDB = async () => {
  const [rows] = await pool.query(`
    SELECT
      q.id                                      AS questionId,
      q.question,
      qs.correct_count                          AS correctCount,
      qs.incorrect_count                        AS incorrectCount,
      ROUND(
        (
          qs.correct_count /
          NULLIF(qs.correct_count + qs.incorrect_count, 0)
        ) * 100,
        2
      )                                         AS success_rate,
      (q.id - 300)                              AS number
    FROM questions q
    INNER JOIN question_stats qs ON q.id = qs.question_id
    WHERE q.topic = 'thermal'
    ORDER BY q.id ASC
  `);

  return rows;
};