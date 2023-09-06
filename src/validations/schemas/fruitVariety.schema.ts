import Joi from '@hapi/joi';

const fruitVarietySchema = Joi.object({
  id: Joi.number().optional(),
  fruit_id: Joi.number().required(),
  variety: Joi.string().required(),
})

export { fruitVarietySchema };