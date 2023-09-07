import { Request, Response } from 'express';
import { addHarvestLogic } from './services/addHarvestLogic';
import { getDatabase } from '../../db';

export async function addHarvest(req: Request, res: Response) {
    const db = getDatabase();
    try {
        const lastID = await addHarvestLogic(db, req.body);
        res.status(200).json({ id: lastID });
    } catch (error) {
        res.status(500).json({ error: 'Error adding harvest' });
    }
}
