import { Database } from 'sqlite3';
import { customerSchema } from './schemas/customer.schema';
import { NextFunction, Response, Request } from 'express';

function isCustomerEmailUnique(db: Database, email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM Customers WHERE email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(!row);
      }
    });
  });
}

function validateCustomerSchema(req: Request, res: Response, next: NextFunction) {
  const { error } = customerSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export { isCustomerEmailUnique, validateCustomerSchema };
