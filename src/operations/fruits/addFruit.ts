import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { addFruitLogic } from './services/addFruitLogic';

async function addFruit(req: Request, res: Response) {
    const db = getDatabase();
    const name = req.body.name;

    try {
        const fruitId = await addFruitLogic(db, { name });
        res.json({ id: fruitId });
    } catch (err) {
        if ((err as Error).message === 'Fruit name already exists.') {
            res.status(409).json({ error: (err as Error).message });
        } else {
            res.status(500).json({ error: (err as Error).message });
        }
    }
}

export { addFruit };
