import express from 'express';
import cors from 'cors';

import gameRoutes from './routes/games.routes';
import section6Routes from './routes/section6.routes';
import section6QuestionRoutes from "./routes/section6Question.routes";
import section6ValidateRoutes from "./routes/section6Validate.routes";
import section6StatsRoutes from "./routes/section6Stats.routes";
import section4Routes from './routes/section4.routes';
import section4QuestionRoutes from "./routes/section4Question.routes";
import section4ValidateRoutes from "./routes/section4Validate.routes";
import section4StatsRoutes from "./routes/section4Stats.routes";

const app = express();

// CORS configurado para permitir todas las solicitudes
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false
}));


// Middlewares
app.use(express.json());

// Routes

app.use("/api/section6/stats", section6StatsRoutes);

app.use("/api/section6", section6Routes);

app.use("/api/section6/questions", section6QuestionRoutes);

app.use("/api/section6/validate", section6ValidateRoutes);

app.use("/api/section4/stats", section4StatsRoutes);

app.use("/api/section4", section4Routes);

app.use("/api/section4/questions", section4QuestionRoutes);

app.use("/api/section4/validate", section4ValidateRoutes);

app.use('/api/semana7', gameRoutes);

app.use(express.static("public"));

// 404
app.use((_req, res) => {
    res.status(404).json({
        message: "Ruta no encontrada."
    });
});

export default app;