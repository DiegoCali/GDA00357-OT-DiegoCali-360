require('dotenv').config();
import express from 'express';
import { OrderDetail } from './models/OrderDetailModel';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('\x1b[36m%s\x1b[0m', 'GET /');
    OrderDetail.findAll().then((orderdetails) => {            
        res.send(orderdetails);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
