import pool from '../config/database';

export interface GameScore {
    id?: number;
    student_name: string;
    score: number;
    correct_answers: number;
    played_at?: Date;
}

export class GameModel {
    // Guardar una nueva puntuación
    static async saveScore(data: GameScore): Promise<boolean> {
        const query = `
            INSERT INTO game_scores (student_name, score, correct_answers) 
            VALUES (?, ?, ?)
        `;
        const [result] = await pool.execute(query, [data.student_name, data.score, data.correct_answers]);
        return (result as any).affectedRows > 0;
    }

    // Obtener el Top 10 de mejores puntuaciones del juego
    static async getLeaderboard(): Promise<GameScore[]> {
        const query = `
            SELECT student_name, score, correct_answers, played_at 
            FROM game_scores 
            ORDER BY score DESC, played_at DESC 
            LIMIT 10
        `;
        const [rows] = await pool.execute(query);
        return rows as GameScore[];
    }
}