import express, { Request, Response } from 'express';

import { getFruitVarieties } from '../operations/fruitVarieties/getFruitVarieties';
import { addFruitVariety } from '../operations/fruitVarieties/addFruitVariety';
import { validateFruitVarietySchema } from '../validations/fruitVarietyValidations';

const router = express.Router();

router.get('/', getFruitVarieties);

router.post('/', validateFruitVarietySchema, addFruitVariety);

export default router;
