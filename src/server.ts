import express from 'express';
import bodyParser from 'body-parser';
import { openDatabase } from './db';
import fruitsRouter from './routes/fruits';
import fruitsVarietiesRouter from './routes/fruitVarieties';
import farmersRouter from './routes/farmers';
import fieldsRouter from './routes/fields';
import harvestsRouter from './routes/harvests';
import customersRouter from './routes/customers';
import uploadsRouter from './routes/upload';

import { initDB } from './models/initDB';
import { errorHandler } from './middlewares/errorHandler';
const YAML = require('yamljs');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('src/api-docs.yaml');

const app = express();
const PORT = 3000;

openDatabase();
initDB();

app.use(bodyParser.json());
app.use('/api/fruits', fruitsRouter);
app.use('/api/fruitvarieties', fruitsVarietiesRouter);
app.use('/api/farmers', farmersRouter);
app.use('/api/fields', fieldsRouter);
app.use('/api/harvests', harvestsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/upload-csv', uploadsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

app.use(errorHandler);
