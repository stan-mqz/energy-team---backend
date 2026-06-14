import { Router }
    from "express";

import {
    validateSection4Controller
} from "../controllers/section4Validate.controller";

const router = Router();

router.post(
    "/",
    validateSection4Controller
);

export default router;