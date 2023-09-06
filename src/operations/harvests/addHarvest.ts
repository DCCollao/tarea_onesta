import { Request, Response } from 'express';
import { getDatabase } from '../../db';
import { validateHarvestSchema } from '../../validations/harvestValidations';

async function addHarvest(req: Request, res: Response) {
    const db = getDatabase();
    const { variety_id, field_id, harvest_date, quantity } = req.body;

    const sql = 'INSERT INTO Harvests (variety_id, field_id, harvest_date, quantity) VALUES (?, ?, ?, ?)';
    db.run(sql, [variety_id, field_id, harvest_date, quantity], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
}

export { addHarvest };
