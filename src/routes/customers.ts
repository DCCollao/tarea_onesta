import express from 'express';
import { addCustomer } from '../operations/customers/addCustomer';
import { validateCustomerSchema } from '../validations/customerValidations';
import { getAllCustomers } from '../operations/customers/getAllCustomers';

const router = express.Router();

router.post('/', validateCustomerSchema, addCustomer);

router.get('/', getAllCustomers);

export default router;
