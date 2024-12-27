require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter';
import { authRouter } from './routes/authRouter';
import { categoryRouter } from './routes/categoryRouter';
import { productRouter } from './routes/productRouter';
import { orderRouter } from './routes/orderRouter';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(authRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m',`App listening at http://localhost:${port}`);
});
