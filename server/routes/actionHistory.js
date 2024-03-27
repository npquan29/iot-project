import express from 'express';
import { filterAction, getActionHistory, postAction } from '../controllers/actionController.js';
const router = express.Router();

router.get('/', getActionHistory);
router.post('/', postAction);
router.post('/history', filterAction);

export default router;