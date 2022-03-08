/* eslint-disable prefer-regex-literals */
const Joi = require('@hapi/joi');

const validateField = {
  name: Joi.string().min(6).messages({
    'string.min': `Name length must be at least 6 characters long`,
    'string.empty': `Name must contain value`,
    'any.required': `Name is a required field`,
  }),
  email: Joi.string().email().messages({
    'string.email': `Please enter a valid email address.`,
    'string.empty': `Email must contain value`,
    'any.required': `Email is a required field`,
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': `Password length must be at least 6 characters long`,
    'string.empty': `Password must contain value`,
    'any.required': `Password is a required field`,
  }),
  phone: Joi.string().pattern(new RegExp('^[0-9]+$')).length(9).messages({
    'string.pattern.base': `Phone number must be valid`,
    'string.length': `Phone number length must be 9 characters long`,
    'string.empty': `Phone number must contain value`,
    'any.required': `Phone number is a required field`,
  }),
};

export const registerValidation = (data) => {
  const schemaUser = Joi.object({
    name: validateField.name.required(),
    email: validateField.email.required(),
    password: validateField.password,
    phone: validateField.phone.required(),
  });

  return schemaUser.validate(data);
};

export const loginValidation = (data) => {
  const schemaUser = Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
    // Na czas testowania.
    // email: validateField.email.required(),
    // password: Joi.required(),
  });

  return schemaUser.validate(data);
};

export const editValidation = (data) => {
  const schemaUser = Joi.object({
    name: validateField.name,
    phone: validateField.phone,
  });

  return schemaUser.validate(data);
};

export const passwdEditValidation = (data) => {
  const schemaUser = Joi.object({
    password: Joi.required(),
    newPassword: validateField.password,
    newPasswordRepeat: Joi.required(),
  });

  return schemaUser.validate(data);
};
