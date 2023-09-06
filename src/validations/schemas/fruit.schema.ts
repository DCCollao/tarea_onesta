import Joi from '@hapi/joi';

const fruitSchema = Joi.object({
  id: Joi.number().optional(),
  name: Joi.string().required(),
})

export { fruitSchema };