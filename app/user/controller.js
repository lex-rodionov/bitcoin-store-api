const express = require('express');
const router = express.Router();

const {
  signupSchema,
  updateUserSchema,
  transferSchema,
  tradeSchema,
} = require('./validation-schemas');
const userService = require('./service');
const {
  returnUserNotFound,
  returnError,
  returnResponse,
} = require('./utils');

router.post('/', async (req, res) => {
  try {
    const body = await signupSchema.validateAsync(req.body);
    const user = await userService.signUp(body);

    returnResponse(res, user);
  } catch (err) {
    returnError(res, err.message, 422);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userService.getById(userId);

    if (user) {
      returnResponse(res, user);
    } else {
      returnUserNotFound(res);
    }
  } catch (err) {
    returnError(res, err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const {name, email} = await updateUserSchema.validateAsync(req.body);
    const user = await userService.update(userId, name, email);

    if (user) {
      returnResponse(res, user);
    } else {
      returnUserNotFound(res);
    }
  } catch (err) {
    returnError(res, err.message);
  }
});

router.post('/:userId/usd', async (req, res) => {
  try {
    const {userId} = req.params;
    const {action, amount} = await transferSchema.validateAsync(req.body);
    const user = await userService.transferMoney(userId, action, amount);

    if (user) {
      returnResponse(res, user);
    } else {
      returnUserNotFound(res);
    }
  } catch (err) {
    returnError(res, err.message);
  }
});

router.post('/:userId/bitcoins', async (req, res) => {
  try {
    const {userId} = req.params;
    const {action, amount} = await tradeSchema.validateAsync(req.body);
    const user = await userService.tradeBitcoin(userId, action, amount);

    if (user) {
      returnResponse(res, user);
    } else {
      returnUserNotFound(res);
    }
  } catch (err) {
    returnError(res, err.message);
  }
});

router.get('/:userId/balance', async (req, res) => {
  try {
    const {userId} = req.params;
    const balance = await userService.getBalance(userId);

    if (balance) {
      returnResponse(res, balance);
    } else {
      returnUserNotFound(res);
    }
  } catch (err) {
    returnError(res, err.message);
  }
});

module.exports = router;