import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { isFruitVarietyCombinationUnique } from '../../validations/fruitVarietyValidations';

async function addFruitVariety(req: Request, res: Response) {
    const db = getDatabase();
    const fruit_id = req.body.fruit_id;
    const variety = req.body.variety;

    try {
        const unique = await isFruitVarietyCombinationUnique(db, fruit_id, variety);
        
        if (!unique) {
            res.status(409).json({ error: 'Fruit variety combination already exists.' });
            return;
        }

        const sql = 'INSERT INTO FruitVarieties (fruit_id, variety) VALUES (?, ?)';
        db.run(sql, [fruit_id, variety], function(err) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({ id: this.lastID });
        });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
}

export { addFruitVariety };
