import { Request, Response }
    from "express";

import {
    fetchSection5
} from "../services/section5.service";

export const getSection5Controller =
    async (
        _req: Request,
        res: Response
    ) => {

        try {

            const sections =
                await fetchSection5();

            res.json({
                ok: true,
                data: sections
            });

        } catch (error) {

            res.status(500).json({
                ok: false,
                message: "Server error"
            });

        }

    };