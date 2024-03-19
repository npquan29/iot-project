import express from 'express';
import { filterAction, getActions, postAction } from '../controllers/actionController.js';
const router = express.Router();

router.get('/', getActions);
router.post('/', postAction);
router.post('/history', filterAction);

export default router;