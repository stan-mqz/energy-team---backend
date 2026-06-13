import { Router }
    from "express";

import {
    getSection5StatsController
} from "../controllers/section5Stats.controller";

const router = Router();

router.get(
    "/",
    getSection5StatsController
);

export default router;