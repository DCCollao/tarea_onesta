import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { addCustomerLogic } from './services/addCustomerLogic';

async function addCustomer(req: Request, res: Response) {
    const db = getDatabase();

    try {
        const lastID = await addCustomerLogic(db, req.body);
        res.json({ id: lastID });
    } catch (err) {
        if ((err as Error).message === 'Email already exists for a customer.') {
            res.status(409).json({ error: (err as Error).message });
        } else {
            res.status(500).json({ error: (err as Error).message });
        }
    }
}

export { addCustomer };
