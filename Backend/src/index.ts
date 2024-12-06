require('dotenv').config();
import express from 'express';
import { Product } from './models/ProductModel';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    Product.findAll().then((products) => {
        res.send(products);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
