import pool from '../config/database';

export interface GameScore {
    id?: number;
    student_name: string;
    score: number;
    correct_answers: number;
    played_at?: Date;
}

export class GameModel {

    // ✅ GUARDAR PUNTAJE
    static async saveScore(data: GameScore): Promise<boolean> {
        const query = `
            INSERT INTO game_scores (student_name, score, correct_answers) 
            VALUES (?, ?, ?)
        `;
        const [result] = await pool.execute(query, [
            data.student_name,
            data.score,
            data.correct_answers
        ]);

        return (result as any).affectedRows > 0;
    }

    // ✅ LEADERBOARD
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

    // 🔥 OBTENER PREGUNTAS DESDE BD
    static async getQuestions() {

        const query = `
            SELECT 
                id,
                question,
                option_a,
                option_b,
                option_c
            FROM questions
            WHERE topic = 'electricity'
        `;

        const [rows]: any = await pool.execute(query);

        return rows.map((q: any) => ({
            id: q.id,
            question: q.question,
            options: [
                q.option_a,
                q.option_b,
                q.option_c
            ]
        }));
    }

    // 🔥 OBTENER RESPUESTAS CORRECTAS
    static async getCorrectAnswers() {

        const query = `
            SELECT 
                id,
                correct_answer,
                option_a,
                option_b,
                option_c
            FROM questions
            WHERE topic = 'electricity'
        `;

        const [rows]: any = await pool.execute(query);

        const map: any = {};

        rows.forEach((q: any) => {

            const options = [
                q.option_a,
                q.option_b,
                q.option_c
            ];

            const correctIndex = options.indexOf(q.correct_answer);

            map[q.id] = correctIndex;
        });

        return map;
    }

    // 🔥 SUMAR RESPUESTA CORRECTA
    static async incrementCorrect(questionId: number) {

        const query = `
            UPDATE question_stats
            SET correct_count = correct_count + 1
            WHERE question_id = ?
        `;

        await pool.execute(query, [questionId]);
    }

    // 🔥 SUMAR RESPUESTA INCORRECTA
    static async incrementIncorrect(questionId: number) {

        const query = `
            UPDATE question_stats
            SET incorrect_count = incorrect_count + 1
            WHERE question_id = ?
        `;

        await pool.execute(query, [questionId]);
    }
}