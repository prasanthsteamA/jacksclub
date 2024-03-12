export interface TransactionData {
    idempotentKey: string;
    userId: string;
    amount: number;
    type: 'credit' | 'debit';
  }
  