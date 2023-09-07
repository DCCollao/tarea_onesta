import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { addFarmerLogic } from './services/addFarmerLogic';

async function addFarmer(req: Request, res: Response) {
    const db = getDatabase();

    try {
        const lastID = await addFarmerLogic(db, req.body);
        res.json({ id: lastID });
    } catch (err) {
        if ((err as Error).message === 'Email already exists for a farmer.') {
            res.status(409).json({ error: (err as Error).message });
        } else {
            res.status(500).json({ error: (err as Error).message });
        }
    }
}

export { addFarmer };
