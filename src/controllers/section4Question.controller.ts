import { Request, Response }
    from "express";

import {
    fetchSection4Questions
} from "../services/section4Question.service";

export const getSection4QuestionsController =
    async (
        _req: Request,
        res: Response
    ) => {

        try {

            const questions =
                await fetchSection4Questions();

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