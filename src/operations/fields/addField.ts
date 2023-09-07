import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { addFieldLogic } from './services/addFieldLogic';

async function addField(req: Request, res: Response) {
    const db = getDatabase();

    try {
        const lastID = await addFieldLogic(db, req.body);
        res.json({ id: lastID });
    } catch (err) {
        if ((err as Error).message === 'Field name and location combination already exists.') {
            res.status(409).json({ error: (err as Error).message });
        } else {
            res.status(500).json({ error: (err as Error).message });
        }
    }
}

export { addField };
