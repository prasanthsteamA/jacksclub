import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { Card, Input, Button, message } from 'antd';
import axios from 'axios';
import { Balance } from './balanceInterfaces';
import './Balance.css'; 

const BalanceComponent: React.FC = () => {
  const [userId, setUserId] = useState<string>('1');
  const [balance, setBalance] = useState<number | null>(null);

  const getBalance = async () => {
    try {
      const response: AxiosResponse<Balance> = await axios.get(`http://localhost:4000/api/balance/${userId}`);
      setBalance(response.data.balance);
    } catch (error) {
      setBalance(null);
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

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <Card
      title={<div className="card-title">User Balance</div>}
      className="card-container"
    >
      <div className="balance-container">
        <h2 className="balance-text">Balance: {balance !== null ? `$${balance}` : 'Loading...'}</h2>
        <label htmlFor="userId">User ID</label>
        <Input
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input-container"
        />
        <Button type="primary" onClick={getBalance} className="get-balance-button">
          Get Balance
        </Button>
      </div>
    </Card>
  );
};

export default BalanceComponent;
