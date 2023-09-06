import Joi from '@hapi/joi';

const farmerSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
})

export { farmerSchema };
