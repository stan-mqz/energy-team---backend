import { Router }
    from "express";

import {
    getSection4Controller
} from "../controllers/section4.controller";

const router = Router();

router.get(
    "/",
    getSection4Controller
);

export default router;