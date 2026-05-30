import pool from "../config/database";

export const getAllSection6 =
    async () => {

        const [rows] = await pool.query(`
    SELECT *
    FROM sections
    WHERE topic = 'light'
    ORDER BY position_order ASC
    `);

        return rows;
    };