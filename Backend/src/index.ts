require('dotenv').config();
import express from 'express';
import { Order } from './models/OrderModel';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('GET /');
    Order.findAll().then((orders) => {            
        res.send(orders);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
