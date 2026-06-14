import pool from "../config/database";

export const getSection4Questions = async () => {

    const [rows] = await pool.query(`
        SELECT
            id,
            topic,
            question,
            option_a,
            option_b,
            option_c
        FROM questions
        WHERE topic = 'water'
    `);

    return rows;
};