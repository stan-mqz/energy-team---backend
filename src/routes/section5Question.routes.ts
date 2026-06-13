import { Router }
    from "express";

import {
    getSection5QuestionsController
} from "../controllers/section5Question.controller";

const router = Router();

router.get(
    "/",
    getSection5QuestionsController
);

export default router;