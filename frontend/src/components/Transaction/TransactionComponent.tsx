import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { Button, Input, Select, message, Card } from 'antd';
import { TransactionData } from './transactionInterfaces';
import './Transaction.css';

// Component to process user transactions
const TransactionComponent: React.FC = () => {
  const [transactionData, setTransactionData] = useState<TransactionData>({
    idempotentKey: '',
    userId: '1',
    amount: 0,
    type: 'credit',
  });

  const handleTransaction = async () => {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:4000/api/transaction', transactionData);
      const successMessage = response.data.message || 'Transaction processed successfully';
      message.success(successMessage);
    } catch (error) {
      console.error("Error:", error);

      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          message.error(axiosError.response.data.error);
        } else {
          message.error('An error occurred during the request.');
        }
      } else {
        message.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <Card
      title={<div className="card-title">Transaction</div>}
      className="card-container"
    >
      <div className="form-container">
        <label htmlFor="idempotentKey" className="input-label">Idempotent Key</label>
        <Input
          id="idempotentKey"
          placeholder="Idempotent Key"
          value={transactionData.idempotentKey}
          onChange={(e) => setTransactionData({ ...transactionData, idempotentKey: e.target.value })}
          className="input-field"
        />
        <label htmlFor="userId" className="input-label">User ID</label>
        <Input
          id="userId"
          placeholder="Enter User ID"
          value={transactionData.userId}
          onChange={(e) => setTransactionData({ ...transactionData, userId: e.target.value })}
          className="input-field"
        />
        <label htmlFor="amount" className="input-label">Amount</label>
        <Input
          id="amount"
          placeholder="Amount"
          value={transactionData.amount}
          onChange={(e) => {
            const parsedValue = parseFloat(e.target.value);
            if (!isNaN(parsedValue)) {
              setTransactionData({ ...transactionData, amount: parsedValue });
            }
          }}
          className="input-field"
        />
        <label htmlFor="type" className="input-label">Transaction Type</label>
        <Select
          id="type"
          className="select-field"
          defaultValue="credit"
          onChange={(value: 'credit' | 'debit') => setTransactionData({ ...transactionData, type: value })}
        >
          <Select.Option value="credit">Credit</Select.Option>
          <Select.Option value="debit">Debit</Select.Option>
        </Select>

        <Button type="primary" onClick={handleTransaction} className="button">
          Process Transaction
        </Button>
      </div>
    </Card>
  );
};

export default TransactionComponent;
