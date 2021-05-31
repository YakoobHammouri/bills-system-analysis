const joi = require('@hapi/joi');
const RegExp = require('xregexp');

// To ensure that user type email correctly
const validateEmail = (email) => {
  const schema = joi.object({
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
  });
  return schema.validate(email);
};

// To ensure that user enter both email and password
const validateLoginInfo = (userData) => {
  const schema = joi.object({
    email: joi
      .string()
      .min(6)
      .required()
      .email(),
    password: joi
      .string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(userData);
};

const newBillValidation = (billData) => {
  const schema = joi.object({
    providerId: joi.number().required(),
    type: joi.string().required(),
    totalAmount: joi.number().required(),
    billDate: joi.date().required(),
    dueDate: joi.date().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    billNumber: joi.number().required(),
  });
  return schema.validate(billData);
};

module.exports = { validateEmail, validateLoginInfo, newBillValidation };
