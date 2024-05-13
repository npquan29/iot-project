import express from 'express';
const router = express.Router();

import { getHistorySensorDatas, getLatestSensorData, getSensorData, getLatestSensorDataV1, getSensorDataV1 } from '../controllers/sensorDataController.js';

// Show Case 1
router.get('/', getLatestSensorData);
router.get('/history', getHistorySensorDatas);
router.get('/history-v1', getSensorData);
// End Show Case 1

// Addition Sensor
// router.get("/", getLatestSensorDataV1);
// router.get('/history-v1', getSensorDataV1);
// End Addition Sensor

export default router;