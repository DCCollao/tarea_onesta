import express from 'express';
import { addHarvest } from '../operations/harvests/addHarvest';
import { validateHarvestSchema } from '../validations/harvestValidations';
import { getAllHarvests } from '../operations/harvests/getAllHarvests';

const router = express.Router();

router.post('/', validateHarvestSchema, addHarvest);

router.get('/', getAllHarvests);

export default router;
