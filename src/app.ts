import express from 'express';
import gameRoutes from './routes/games.routes';

const app = express();

// Middlewares
app.use(express.json());

// Prefijo global para las rutas de la API REST
app.use('/api/semana7', gameRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada." });
});

export default app;