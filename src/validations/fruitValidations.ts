import { Database } from 'sqlite3';
import { fruitSchema } from './schemas/fruit.schema';
import { NextFunction, Response, Request } from 'express';

function isFruitNameUnique(db: Database, name: string): Promise<boolean> {
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

function validateFruitSchema(req: Request, res: Response, next: NextFunction) {
  const { error } = fruitSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export { isFruitNameUnique, validateFruitSchema };