import { Request, Response } from 'express';
import { getDatabase } from '../../db';

function getFruitById(req: Request, res: Response) {
    const sql = 'SELECT * FROM Fruits WHERE id = ?';
    const params = [req.params.id];
    const db = getDatabase();
  
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
}

export { getFruitById };
