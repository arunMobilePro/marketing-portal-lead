import * as Joi from 'joi';
export const envValidation = Joi.object({
  PORT: Joi.number().required(),
  MONGO_URI: Joi.string().required(),
  ENV: Joi.string().required(),
  JWT_SECRET_KEY: Joi.string().required(),
});
