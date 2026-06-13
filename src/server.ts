import app from "./app";
import { testConnection } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {

    await testConnection();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });

};

startServer();