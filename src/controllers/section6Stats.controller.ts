import { Request, Response }
    from "express";

import {
    fetchSection6Stats
} from "../services/section6Stats.service";

export const getSection6StatsController =
    async (
        _req: Request,
        res: Response
    ) => {

        try {

            const stats =
                await fetchSection6Stats();

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