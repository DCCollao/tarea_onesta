import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { isFarmerEmailUnique } from '../../validations/farmerValidations';

async function addFarmer(req: Request, res: Response) {
    const db = getDatabase();
    const { name, email } = req.body;

    try {
        const unique = await isFarmerEmailUnique(db, email);
        
        if (!unique) {
            res.status(409).json({ error: 'Email already exists.' });
            return;
        }

        const sql = 'INSERT INTO Farmers (name, email) VALUES (?, ?)';
        db.run(sql, [name, email], function(err) {
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

export { addFarmer };
