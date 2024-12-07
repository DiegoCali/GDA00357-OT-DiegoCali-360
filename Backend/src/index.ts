require('dotenv').config();
import express from 'express';
import { Role } from './models/RoleModel';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('\x1b[36m%s\x1b[0m', 'GET /');
    Role.findAll().then((categories) => {            
        res.send(categories);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
