import pool from "../config/database";

export const getAllSection1 = async () => {
  const [rows] = await pool.query(`
    SELECT *
    FROM sections
    WHERE topic = 'mechanics'
    ORDER BY position_order ASC
  `);

  return rows;
};
