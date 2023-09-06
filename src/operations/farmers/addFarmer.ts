import { Request, Response } from 'express';
import { addFarmerLogic } from './services/addFarmerLogic';

export async function addFarmer(req: Request, res: Response) {
    try {
        console.log(req.body);
        const lastID = await addFarmerLogic(req.body);
        res.status(200).json({ id: lastID });
    } catch (error) {
        res.status(500).json({ error: 'Error adding farmer' });
    }
}
