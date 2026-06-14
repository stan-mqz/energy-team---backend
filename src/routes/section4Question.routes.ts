import { Router }
    from "express";

import {
    getSection4QuestionsController
} from "../controllers/section4Question.controller";

const router = Router();

router.get(
    "/",
    getSection4QuestionsController
);

export default router;