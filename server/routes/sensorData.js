import express from 'express';
const router = express.Router();

import { getHistorySensorDatas, getLatestSensorData } from '../controllers/sensorDataController.js';

router.get('/', getLatestSensorData);
router.get('/history', getHistorySensorDatas);

export default router;