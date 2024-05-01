import express from 'express';
const router = express.Router();

import { getHistorySensorDatas, getLatestSensorData, getSensorData } from '../controllers/sensorDataController.js';

router.get('/', getLatestSensorData);
router.get('/history', getHistorySensorDatas);

// Test
router.get('/history-v1', getSensorData);

export default router;