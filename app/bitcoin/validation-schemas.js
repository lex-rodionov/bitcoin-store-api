const Joi = require('joi');

const updatePriceSchema = Joi.object({
  price: Joi.number()
    .positive()
    .required(),
});

module.exports = {
  updatePriceSchema,
};