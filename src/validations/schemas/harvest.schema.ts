import Joi from '@hapi/joi';

const harvestSchema = Joi.object({
  id: Joi.number().optional(),
  variety_id: Joi.number().required(),
  field_id: Joi.number().required(),
  harvest_date: Joi.date().required(),
  quantity: Joi.number().required(),
})

export { harvestSchema };
