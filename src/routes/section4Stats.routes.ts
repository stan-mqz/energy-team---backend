import { Router }
    from "express";

import {
    getSection4StatsController
} from "../controllers/section4Stats.controller";

const router = Router();

router.get(
    "/",
    getSection4StatsController
);

export default router;