const Joi = require('@hapi/joi');

export const registerValidation = (data) => {
  const schemaUser = Joi.object({
    name: Joi.string().pattern(new RegExp('^[A-Z]{1,255}[a-z]{4,255}[0-9]{1,255}$')).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schemaUser.validate(data);
};

export const loginValidation = (data) => {
  const schemaUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schemaUser.validate(data);
};
