import { Router } from "express";
import { section2Controller } from "../controllers/section2.controller";

const router = Router();

router.get(
    "/questions",
    section2Controller.getGameQuestions
);

router.post(
    "/submit",
    section2Controller.submitResults
);

router.get(
    "/leaderboard",
    section2Controller.getLeaderboard
);

export default router;