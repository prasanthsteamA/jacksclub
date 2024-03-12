import { Request, Response } from 'express';
import { BalanceService } from '../services/balanceService';

const balanceService = new BalanceService();

// Controller for retrieving user balance

export const getBalance = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;  
  try {
    const balance = await balanceService.getBalance(userId);
    res.status(200).json({ balance });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Internal Server Error' });
  }
};
