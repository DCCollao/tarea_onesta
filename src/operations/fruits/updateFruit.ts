import { Request, Response } from 'express';
import { getDatabase } from '../../db';

function updateFruit(req: Request, res: Response) {
    const sql = 'UPDATE Fruits SET name = ? WHERE id = ?';
    const params = [req.body.name, req.params.id];
    const db = getDatabase();

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Fruit updated', changes: this.changes });
    });
}

export { updateFruit };
