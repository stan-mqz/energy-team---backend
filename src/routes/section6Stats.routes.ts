import { Router }
    from "express";

import {
    getSection6StatsController
} from "../controllers/section6Stats.controller";

const router = Router();

router.get(
    "/",
    getSection6StatsController
);

export default router;