import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionService';

const transactionService = new TransactionService();

// Controller for processing user transactions
export const processTransaction = async (req: Request, res: Response): Promise<void> => {
  const { idempotentKey, userId, amount, type } = req.body;
  try {
    await transactionService.processTransaction(idempotentKey, userId, amount, type);
    res.status(200).json({ message: 'Transaction processed successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
  }
};
