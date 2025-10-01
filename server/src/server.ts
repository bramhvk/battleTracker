import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import monsterRoutes from "./routes/monsterRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/monsters', monsterRoutes);

// Connect DB and start server
connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
