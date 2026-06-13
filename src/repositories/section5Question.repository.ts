import pool from "../config/database";

export const getSection5Questions = async () => {

    const [rows] = await pool.query(`
        SELECT
            id,
            topic,
            question,
            option_a,
            option_b,
            option_c
        FROM questions
        WHERE topic = 'energy_transformation'
    `);

    return rows;
};