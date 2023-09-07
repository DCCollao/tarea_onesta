import express, { Request, Response } from 'express';

import { getFruits } from '../operations/fruits/getFruits';
import { getFruitById } from '../operations/fruits/getFruitById';
import { addFruit } from '../operations/fruits/addFruit';
import { updateFruit } from '../operations/fruits/updateFruit';
import { deleteFruit } from '../operations/fruits/deleteFruit';
import { validateFruitSchema } from '../validations/fruitValidations';

const router = express.Router();

router.get('/', getFruits);

router.get('/:id', getFruitById);

router.post('/', validateFruitSchema, addFruit);

router.put('/:id', validateFruitSchema, updateFruit);

router.delete('/:id', deleteFruit);

export default router;
