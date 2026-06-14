import pool from "../config/database";

export const getAllSection2 = async () => {

    const [rows] = await pool.query(`
        SELECT *
        FROM sections
        WHERE topic = 'electric_energy'
        ORDER BY position_order ASC
    `);

    return rows;
};