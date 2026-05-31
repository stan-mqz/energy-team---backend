import { Router }
    from "express";

import {
    getSection6QuestionsController
} from "../controllers/section6Question.controller";

const router = Router();

router.get(
    "/",
    getSection6QuestionsController
);

export default router;