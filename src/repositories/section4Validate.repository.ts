import { RowDataPacket } from "mysql2";
import pool from "../config/database";

interface CorrectAnswer extends RowDataPacket {
    id: number;
    correct_answer: string;
}

export const getCorrectAnswers = async (): Promise<CorrectAnswer[]> => {

    const [rows] = await pool.query<CorrectAnswer[]>(`
        SELECT
            id,
            correct_answer
        FROM questions
        WHERE topic = 'water'
    `);

    return rows;
};

export const incrementCorrectAnswer = async (
    questionId: number
) => {

    await pool.query(
        `
        UPDATE question_stats
        SET correct_count = correct_count + 1
        WHERE question_id = ?
        `,
        [questionId]
    );

};

export const incrementIncorrectAnswer = async (
    questionId: number
) => {

    await pool.query(
        `
        UPDATE question_stats
        SET incorrect_count = incorrect_count + 1
        WHERE question_id = ?
        `,
        [questionId]
    );

};