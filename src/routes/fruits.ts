import express, { Request, Response } from 'express';

import { getFruits } from '../operations/fruits/getFruits';
import { getFruitById } from '../operations/fruits/getFruitById';
import { addFruit } from '../operations/fruits/addFruit';
import { updateFruit } from '../operations/fruits/updateFruit';
import { deleteFruit } from '../operations/fruits/deleteFruit';

const router = express.Router();

// GET: Get all fruits
router.get('/', getFruits);

// GET: get a specific fruit by its ID
router.get('/:id', getFruitById);

// POST: Add a new fruit
router.post('/', addFruit);

// PUT: Update a fruit by its ID
router.put('/:id', updateFruit);

// DELETE: Delete a fruit by its ID
router.delete('/:id', deleteFruit);

export default router;
