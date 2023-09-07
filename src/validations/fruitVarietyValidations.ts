import { Database } from 'sqlite3';
import { fruitVarietySchema } from './schemas/fruitVariety.schema';
import { NextFunction, Response, Request } from 'express';

function isFruitVarietyCombinationUnique(db: Database, fruit_id: number, variety: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM FruitVarieties WHERE fruit_id = ? AND variety = ?';
    db.get(sql, [fruit_id, variety], (err, row) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(!row);
      }
    });
  });
}

function validateFruitVarietySchema(req: Request, res: Response, next: NextFunction) {
  const { error } = fruitVarietySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export { isFruitVarietyCombinationUnique, validateFruitVarietySchema };
