import express from 'express';
import { addFarmer } from '../operations/farmers/addFarmer';
import { validateFarmerSchema } from '../validations/farmerValidations';
import { getAllFarmers } from '../operations/farmers/getAllFarmers';

const router = express.Router();

router.post('/', validateFarmerSchema, addFarmer);

router.get('/', getAllFarmers);

export default router;
