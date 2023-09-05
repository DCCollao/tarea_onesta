import { Response } from 'express';
import { getDatabase } from '../../db';

function getFruits(_: any, res: Response) {
    const sql = 'SELECT * FROM Fruits';
    const db = getDatabase();
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.status(200).json(rows);
    });
}

export { getFruits };
