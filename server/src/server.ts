import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './config/db';
import monsterRoutes from "./routes/monsterRoutes";
import playerCharacterRoutes from "./routes/playerCharacterRoutes";
import campaignRoutes from "./routes/campaignRoutes";
import encounterRoutes from "./routes/encounterRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/monsters', monsterRoutes);
app.use('/api/player-characters', playerCharacterRoutes);
app.use('/api/encounters', encounterRoutes);
app.use('/api/campaigns', campaignRoutes);

// Connect DB and start server
connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
});
