import Joi from '@hapi/joi';

const fieldSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  farmer_id: Joi.number().required(),
})

export { fieldSchema };
