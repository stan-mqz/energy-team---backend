import { Router }
    from "express";

import {
    validateSection6Controller
} from "../controllers/section6Validate.controller";

const router = Router();

router.post(
    "/",
    validateSection6Controller
);

export default router;