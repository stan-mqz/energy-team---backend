import express from 'express';
import cors from 'cors';
import section2Routes from './routes/section2.routes';

import gameRoutes from './routes/games.routes';
import section6Routes from './routes/section6.routes';
import section6QuestionRoutes from "./routes/section6Question.routes";
import section6ValidateRoutes from "./routes/section6Validate.routes";
import section6StatsRoutes from "./routes/section6Stats.routes";

const app = express();

app.use(cors());


// Middlewares
app.use(express.json());

// Routes

app.use("/api/section6/stats", section6StatsRoutes);

app.use("/api/section6", section6Routes);

app.use("/api/section6/questions", section6QuestionRoutes);

app.use("/api/section6/validate", section6ValidateRoutes);

app.use('/api/semana7', gameRoutes);

app.use(express.static("public"));

// 
app.use('/api/section2', section2Routes);

// 404
app.use((req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada."
    });
});

export default app;