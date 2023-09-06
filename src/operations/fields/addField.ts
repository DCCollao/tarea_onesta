import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { isFieldNameLocationUnique } from '../../validations/fieldValidations';

async function addField(req: Request, res: Response) {
    const db = getDatabase();
    const { name, location, farmer_id } = req.body;

    try {
        const unique = await isFieldNameLocationUnique(db, name, location);
        
        if (!unique) {
            res.status(409).json({ error: 'Field name and location combination already exists.' });
            return;
        }

        const sql = 'INSERT INTO Fields (name, location, farmer_id) VALUES (?, ?, ?)';
        db.run(sql, [name, location, farmer_id], function(err) {
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

export { addField };
