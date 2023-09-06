import express from 'express';
import { addField } from '../operations/fields/addField';
import { validateFieldSchema } from '../validations/fieldValidations';
import { getAllFields } from '../operations/fields/getAllFields';

const router = express.Router();

router.post('/', validateFieldSchema, addField);

router.get('/', getAllFields);

export default router;
