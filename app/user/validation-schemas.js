const Joi = require('joi');

const {
  TRANSFER_TYPE,
  TRADE_TYPE,
} = require('./constants');

const signupSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

const updateUserSchema = Joi.object().keys({
  name: Joi.string().min(3),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
}).or('name', 'email');

const transferSchema = Joi.object({
  action: Joi.string()
    .valid(TRANSFER_TYPE.WITHDRAW, TRANSFER_TYPE.DEPOSIT)
    .required(),
  amount: Joi.number()
    .positive()
    .required(),
});

const tradeSchema = Joi.object({
  action: Joi.string()
    .valid(TRADE_TYPE.BUY, TRADE_TYPE.SELL)
    .required(),
  amount: Joi.number()
    .positive()
    .required(),
});

module.exports = {
  signupSchema,
  updateUserSchema,
  transferSchema,
  tradeSchema,
};