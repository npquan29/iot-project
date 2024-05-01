import express from 'express';
import { filterAction, getActionHistory, postAction, getActionData } from '../controllers/actionController.js';
const router = express.Router();

router.get('/', getActionHistory);
router.post('/', postAction);
router.post('/history', filterAction);
router.get('/history-v1', getActionData);

export default router;