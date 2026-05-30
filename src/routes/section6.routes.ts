import { Router }
    from "express";

import {
    getSection6Controller
} from "../controllers/section6.controller";

const router = Router();

router.get(
    "/",
    getSection6Controller
);

export default router;