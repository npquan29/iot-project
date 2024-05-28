import express from 'express';
import { filterAction, getActionHistory, postAction, getActionData, postActionV1, getActionDataV1 } from '../controllers/actionController.js';
const router = express.Router();

// Show Case 1
router.get('/', getActionHistory);
router.post('/', postAction);
router.post('/history', filterAction);
router.get('/history-v1', getActionData);
// End Show Case 1

// Addition Device
// router.get('/', getActionHistory);
// router.post('/', postActionV1);
// router.get('/history-v1', getActionDataV1);
// End Addition Device

export default router;