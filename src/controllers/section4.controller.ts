import { Request, Response }
    from "express";

import {
    fetchSection4
} from "../services/section4.service";

export const getSection4Controller =
    async (
        _req: Request,
        res: Response
    ) => {

        try {

            const sections =
                await fetchSection4();

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