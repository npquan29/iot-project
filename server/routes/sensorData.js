import express from 'express';
const router = express.Router();

import { filterSensorDatas, getAllSensorDatas } from '../controllers/sensorDataController.js';

router.get('/', getAllSensorDatas);
router.post('/', filterSensorDatas);

export default router;