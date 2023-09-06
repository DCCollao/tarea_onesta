import { Request, Response } from 'express';
import { addHarvestLogic } from './services/addHarvestLogic';

export async function addHarvest(req: Request, res: Response) {
    try {
        const lastID = await addHarvestLogic(req.body);
        res.status(200).json({ id: lastID });
    } catch (error) {
        res.status(500).json({ error: 'Error adding harvest' });
    }
}
