import { Request, Response } from "express";

import {
    validateAnswers
} from "../services/section4Validate.service";

export const validateSection4Controller = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        console.log("Body recibido:", req.body);

        const answers = req.body?.answers;

        if (!answers) {

            res.status(400).json({
                ok: false,
                message: "Answers are required"
            });

            return;
        }

        const result = await validateAnswers(answers);

        res.status(200).json({
            ok: true,
            ...result
        });

    } catch (error) {

        console.error("Validate error:", error);

        res.status(500).json({
            ok: false,
            message: "Internal server error"
        });

    }

};