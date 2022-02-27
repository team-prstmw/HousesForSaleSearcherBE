const Joi = require('@hapi/joi');

const validateField = {
  name: Joi.string().min(6).required().messages({
    "string.min": `Name length must be at least 6 characters long`,
    "string.empty": `Name must contain value`,
    "any.required": `Name is a required field`
  }),
  email: Joi.string().email().required().messages({
    "string.email": `Please enter a valid email address.`,
    "string.empty": `Email must contain value`,
    "any.required": `Email is a required field`
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": `Password length must be at least 6 characters long`,
    "string.empty": `Password must contain value`,
    "any.required": `Password is a required field`
  }),
  phone: Joi.string().pattern(new RegExp('^[0-9]+$')).length(9).required().messages({
    "string.pattern.base": `Number must be valid`,
    "string.length": `Number length must be 9 characters long`,
    "string.empty": `Number must contain value`,
    "any.required": `Number is a required field`
  }),
}

export const registerValidation = (data) => {
  const schemaUser = Joi.object(
    validateField,
  );

  return schemaUser.validate(data);
};

export const loginValidation = (data) => {
  const schemaUser = Joi.object({
    email: validateField.email,
    password: validateField.password,
  });

  return schemaUser.validate(data);
};
