import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { isFruitNameUnique } from '../../validations/fruitValidations';

async function addFruit(req: Request, res: Response) {
    const db = getDatabase();
    const name = req.body.name;

    try {
        const unique = await isFruitNameUnique(db, name);
        
        if (!unique) {
            res.status(409).json({ error: 'Fruit name already exists.' });
            return;
        }

        const sql = 'INSERT INTO Fruits (name) VALUES (?)';
        db.run(sql, [name], function(err) {
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

export { addFruit };
