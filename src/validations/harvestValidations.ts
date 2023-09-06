import { harvestSchema } from './schemas/harvest.schema';
import { NextFunction, Response, Request } from 'express';

function validateHarvestSchema(req: Request, res: Response, next: NextFunction) {
  const { error } = harvestSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}

export { validateHarvestSchema };
