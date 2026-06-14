import app from "./app";
import { testConnection } from "./config/database";

const PORT = 3000;

const startServer = async () => {

    await testConnection();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });

};

startServer();