require('dotenv').config();
import express from 'express';
import { userRouter } from './routes/userRouter';
import { categoryRouter } from './routes/categoryRouter';
import { productRouter } from './routes/productRouter';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(categoryRouter);
app.use(productRouter);

app.listen(port, () => {
  console.log('\x1b[36m%s\x1b[0m',`App listening at http://localhost:${port}`);
});
