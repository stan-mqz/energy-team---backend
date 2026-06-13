import pool from "../config/database";

export const getAllSection5 =
    async () => {

        const [rows] = await pool.query(`
    SELECT *
    FROM sections
    WHERE topic = 'energy_transformation'
    ORDER BY position_order ASC
    `);

        return rows;
    };