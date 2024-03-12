import express from 'express';
import { processTransaction } from '../controllers/transactionController';

const router = express.Router();



// Transaction Routes
router.post('/transaction', processTransaction);

export default router;
