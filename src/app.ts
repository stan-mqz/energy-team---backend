import express from "express";
import cors from "cors";


import gameRoutes from "./routes/games.routes";
import section6Routes from "./routes/section6.routes";
import section6QuestionRoutes from "./routes/section6Question.routes";
import section6ValidateRoutes from "./routes/section6Validate.routes";
import section6StatsRoutes from "./routes/section6Stats.routes";
import section3Routes from "./routes/section3.routes";
import section5Routes from './routes/section5.routes';
import section5QuestionRoutes from "./routes/section5Question.routes";
import section5ValidateRoutes from "./routes/section5Validate.routes";
import section5StatsRoutes from "./routes/section5Stats.routes";

const app = express();
app.use(cors());

// Middlewares
app.use(express.json());

// Routes
app.use("/api/section3", section3Routes);
app.use("/api/section5", section5Routes);
app.use("/api/section5/questions", section5QuestionRoutes);
app.use("/api/section5/stats", section5StatsRoutes);
app.use("/api/section6/stats", section6StatsRoutes);

app.use("/api/section6", section6Routes);

app.use("/api/section6/questions", section6QuestionRoutes);

app.use("/api/section6/validate", section6ValidateRoutes);

app.use("/api/semana7", gameRoutes);

app.use(express.static("public"));

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada.",
  });
});

export default app;
