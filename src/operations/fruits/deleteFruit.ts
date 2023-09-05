import { Request, Response } from 'express';
import { getDatabase } from '../../db';

function deleteFruit(req: Request, res: Response) {
    const sql = 'DELETE FROM Fruits WHERE id = ?';
    const params = [req.params.id];
    const db = getDatabase();

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ message: 'Fruit deleted', changes: this.changes });
    });
}

export { deleteFruit };
