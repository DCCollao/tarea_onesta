import { Database } from 'sqlite3';
import { fieldSchema } from './schemas/field.schema';
import { NextFunction, Response, Request } from 'express';

function isFieldNameLocationUnique(db: Database, name: string, location: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Fields WHERE name = ? AND location = ?';
    db.get(sql, [name, location], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!row);
      }
    });
  });
}

function validateFieldSchema(req: Request, res: Response, next: NextFunction) {
  const { error } = fieldSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export { isFieldNameLocationUnique, validateFieldSchema };
