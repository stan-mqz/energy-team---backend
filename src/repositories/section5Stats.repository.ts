import pool from "../config/database";

export const getSection5Stats = async () => {

    const [rows] = await pool.query(`
                SELECT
            q.id AS questionId,
            q.question,
            qs.correct_count,
            qs.incorrect_count,

            ROUND(
                (
                    qs.correct_count /
                    NULLIF(
                        qs.correct_count +
                        qs.incorrect_count,
                        0
                    )
                ) * 100,
                2
            ) AS success_rate

        FROM questions q
        INNER JOIN question_stats qs
            ON q.id = qs.question_id

        WHERE q.topic = 'energy_transformation';
    `);

    return rows;
};