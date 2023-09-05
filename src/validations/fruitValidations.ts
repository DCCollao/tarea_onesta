// validations/fruitValidations.ts

import { Database } from 'sqlite3';

export function isFruitNameUnique(db: Database, name: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Fruits WHERE name = ?';
    db.get(sql, [name], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!row);
      }
    });
  });
}
