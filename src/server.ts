import express from 'express';
import bodyParser from 'body-parser';
import { openDatabase } from './db';
import { initDB } from './models/initDB';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 3000;

openDatabase();
initDB();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

app.use(errorHandler);
