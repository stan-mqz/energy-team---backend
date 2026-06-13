import { Router }
    from "express";

import {
    getSection5Controller
} from "../controllers/section5.controller";

const router = Router();

router.get(
    "/",
    getSection5Controller
);

export default router;