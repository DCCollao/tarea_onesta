import { Database } from 'sqlite3';
import { farmerSchema } from './schemas/farmer.schema';
import { NextFunction, Response, Request } from 'express';

function isFarmerEmailUnique(db: Database, email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Farmers WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!row);
      }
    });
  });
}

function validateFarmerSchema(req: Request, res: Response, next: NextFunction) {
  const { error } = farmerSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export { isFarmerEmailUnique, validateFarmerSchema };
