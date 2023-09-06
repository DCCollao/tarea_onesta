import express from 'express';
import bodyParser from 'body-parser';
import { openDatabase } from './db';
import fruitsRouter from './routes/fruits';
import fruitsVarietiesRouter from './routes/fruitVarieties';
import { initDB } from './models/initDB';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 3000;

openDatabase();
initDB();

app.use(bodyParser.json());
app.use('/fruits', fruitsRouter);
app.use('/fruitvarieties', fruitsVarietiesRouter);
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

app.use(errorHandler);
