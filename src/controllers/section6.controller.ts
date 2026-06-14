import { Request, Response }
    from "express";

import {
    fetchSection6
} from "../services/section6.service";

export const getSection6Controller =
    async (
        _req: Request,
        res: Response
    ) => {

        try {

            const sections =
                await fetchSection6();

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