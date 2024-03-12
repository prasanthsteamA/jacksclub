import express from 'express';
import bodyParser from 'body-parser';
import balanceRoutes from './routes/balanceRoutes';
import transactionRoutes from './routes/transactionRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', balanceRoutes);
app.use('/api', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
