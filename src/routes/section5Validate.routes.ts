import { Router }
    from "express";

import {
    validateSection5Controller
} from "../controllers/section5Validate.controller";

const router = Router();

router.post(
    "/",
    validateSection5Controller
);

export default router;