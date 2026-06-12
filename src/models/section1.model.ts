import pool from "../config/database";

export interface Section1Score {
    id?: number;
    student_name: string;
    score: number;
    correct_answers: number;
    played_at?: Date;
}

export class Section1Model {
    // Guardar una nueva puntuación de la sección 1 (energía mecánica)
    static async saveScore(data: Section1Score): Promise<boolean> {
        const query = `
            INSERT INTO section1_scores (student_name, score, correct_answers) 
            VALUES (?, ?, ?)
        `;
        const [result] = await pool.execute(query, [
            data.student_name,
            data.score,
            data.correct_answers
        ]);
        return (result as any).affectedRows > 0;
    }

    // Obtener el Top 10 de mejores puntuaciones de la sección 1
    static async getLeaderboard(): Promise<Section1Score[]> {
        const query = `
            SELECT student_name, score, correct_answers, played_at 
            FROM section1_scores 
            ORDER BY score DESC, played_at DESC 
            LIMIT 10
        `;
        const [rows] = await pool.execute(query);
        return rows as Section1Score[];
    }
}
