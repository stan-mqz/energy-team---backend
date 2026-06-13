import { Request, Response }
    from "express";

import {
    fetchSection5Stats
} from "../services/section5Stats.service";

export const getSection5StatsController =
    async (
        _req: Request,
        res: Response
    ) => {

        try {

            const stats =
                await fetchSection5Stats();

            res.status(200).json({
                ok: true,
                data: stats
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                ok: false,
                message: "Internal server error"
            });

        }

    };