import dotenv from "dotenv";
import mysql from "mysql2/promise";


dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const testConnection = async () => {
    try {

        console.log("CWD:", process.cwd()); 
        console.log("DB_USER:", process.env.DB_USER);
        const connection = await pool.getConnection();

        console.log("✅ MySQL connected");

        connection.release();

    } catch (error) {

        console.error("❌ Database connection error");
        console.error(error);

    }
};

export default pool;