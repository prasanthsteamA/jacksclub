import express from 'express';
import { getBalance } from '../controllers/balanceController';

const router = express.Router();

// Balance Routes
router.get('/balance/:userId', getBalance);


export default router;
