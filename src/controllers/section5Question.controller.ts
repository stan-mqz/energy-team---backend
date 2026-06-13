import { Request, Response }
    from "express";

import {
    fetchSection5Questions
} from "../services/section5Question.service";

export const getSection5QuestionsController =
    async (
        _req: Request,
        res: Response
    ) => {

        try {

            const questions =
                await fetchSection5Questions();

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