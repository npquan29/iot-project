import express from "express";
import cors from 'cors';
import sensorRouter from "./routes/sensorData.js";
import actionRouter from "./routes/actionHistory.js";
import { connectMQTT } from './controllers/mqttController.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/sensor', sensorRouter);
app.use('/api/action', actionRouter);

connectMQTT();

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));