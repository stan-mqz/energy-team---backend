import { Request, Response }
    from "express";

import {
    fetchSection6Questions
} from "../services/section6Question.service";

export const getSection6QuestionsController =
    async (
        req: Request,
        res: Response
    ) => {

        try {

            const questions =
                await fetchSection6Questions();

            res.json({
                ok: true,
                data: questions
            });

        } catch (error) {

            res.status(500).json({
                ok: false,
                message: "Server error"
            });

        }

    };