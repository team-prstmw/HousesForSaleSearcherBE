const Joi = require('@hapi/joi');

export const registerValidation = (data) => {
  const schemaUser = Joi.object({
    name: Joi.string().pattern(new RegExp('^[A-Za-z0-9]{6,255}$')).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNr: Joi.number().min(9).required(),
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
