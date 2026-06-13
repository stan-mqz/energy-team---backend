import express from 'express';
import cors from 'cors';

import gameRoutes from './routes/games.routes';
import section5Routes from './routes/section5.routes';
import section5QuestionRoutes from "./routes/section5Question.routes";
import section5ValidateRoutes from "./routes/section5Validate.routes";
import section5StatsRoutes from "./routes/section5Stats.routes";

const app = express();

app.use(cors());


// Middlewares
app.use(express.json());

// Routes

app.use("/api/section5/stats", section5StatsRoutes);

app.use("/api/section5/questions", section5QuestionRoutes);

app.use("/api/section5/validate", section5ValidateRoutes);

app.use("/api/section5", section5Routes);

app.use('/api/semana7', gameRoutes);

app.use(express.static("public"));

// 404
app.use((_req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada."
    });
});

export default app;