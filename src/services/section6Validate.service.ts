interface UserAnswer {
    questionId: number;
    answer: string;
}
import {
    getCorrectAnswers,
    incrementCorrectAnswer,
    incrementIncorrectAnswer
}
    from "../repositories/section6Validate.repository";

export const validateAnswers =
    async (
        answers: UserAnswer[]
    ) => {

        const correctAnswers =
            await getCorrectAnswers();

        let score = 0;
        let correctCount = 0;

        for (const userAnswer of answers) {

            const question =
                (correctAnswers as any[]).find(
                    q => q.id === userAnswer.questionId
                );

            if (!question) {
                continue;
            }

            const isCorrect =
                question.correct_answer
                    .trim()
                    .toLowerCase() ===
                userAnswer.answer
                    .trim()
                    .toLowerCase();

            if (isCorrect) {

                score += 10;
                correctCount++;

                await incrementCorrectAnswer(
                    userAnswer.questionId
                );

            } else {

                await incrementIncorrectAnswer(
                    userAnswer.questionId
                );

            }

        }

        return {
            score,
            correctAnswers: correctCount,
            totalQuestions: correctAnswers.length
        };
    };

