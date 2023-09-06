import { Request, Response } from 'express';
import { addCustomerLogic } from './services/addCustomerLogic';

export async function addCustomer(req: Request, res: Response) {
    try {
        const lastID = await addCustomerLogic(req.body);
        res.status(200).json({ id: lastID });
    } catch (error) {
        res.status(500).json({ error: 'Error adding customer' });
    }
}
