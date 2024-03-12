import { User } from '../models/userModel';
import DynamoDBRepository from '../repositories/dynamoDBRepository';

export class TransactionService {
  private dynamoDBRepository: DynamoDBRepository;

  constructor() {
    this.dynamoDBRepository = new DynamoDBRepository();
  }
  
  // Process user transactions with idempotency check

  async processTransaction(idempotentKey: string, userId: string, amount: number, type: string): Promise<void> {
    const user: User | null = await this.dynamoDBRepository.getUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Simulating idempotency by checking if the transaction with the same key has been processed before
    if (user[idempotentKey]) {
      return;
    }

    if (type === 'credit') {
      user.balance += amount;
    } else if (type === 'debit') {
      if (user.balance - amount < 0) {
        throw new Error('Insufficient funds');
      }
      user.balance -= amount;
    } else {
      throw new Error('Invalid transaction type');
    }

    // Update the user's balance and mark the transaction as processed
    user[idempotentKey] = true;
    await this.dynamoDBRepository.updateUser(user);
  }
}
