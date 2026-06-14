import pool from "../config/database";

export const getAllSection4 =
    async () => {

        const [rows] = await pool.query(`
    SELECT *
    FROM sections
    WHERE topic = 'water'
    ORDER BY position_order ASC
    `);

        return rows;
    };