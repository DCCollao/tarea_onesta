import { Request, Response } from 'express';
import { addFieldLogic } from './services/addFieldLogic';

export async function addField(req: Request, res: Response) {
    try {
        const lastID = await addFieldLogic(req.body);
        res.status(200).json({ id: lastID });
    } catch (error) {
        res.status(500).json({ error: 'Error adding field' });
    }
}
