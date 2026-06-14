import { Request, Response }
    from "express";

import {
    fetchSection4Stats
} from "../services/section4Stats.service";

export const getSection4StatsController =
    async ( _req: Request, res: Response ) => {

        try {

            const stats =
                await fetchSection4Stats();

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