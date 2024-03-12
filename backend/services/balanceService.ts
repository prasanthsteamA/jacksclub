import { User } from '../models/userModel';
import DynamoDBRepository from '../repositories/dynamoDBRepository';

export class BalanceService {
  private dynamoDBRepository: DynamoDBRepository;

  constructor() {
    this.dynamoDBRepository = new DynamoDBRepository();
  }

    // Get user balance from DynamoDB
    async getBalance(userId: string): Promise<number> {
        try {
          // Call the DynamoDB repository to get user information
          const user: User | null = await this.dynamoDBRepository.getUser(userId)
          // If the user is not found, throw an error
          if (!user) {
            throw new Error('User not found');
          }
          // Return the user's balance
          return user.balance;
        } catch (error) {
          // Handle the error, log it, or rethrow if needed
          console.error(`Error while getting balance for user ${userId}: ${(error as Error).message}`);
          throw new Error((error as Error).message);
        }
      }
      
}
