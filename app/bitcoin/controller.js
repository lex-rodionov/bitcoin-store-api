const express = require('express')
const router = express.Router()

const {updatePriceSchema} = require('./validation-schemas');
const bitcoinService = require('./service');
const logger = require('../services/logger');

router.put('/', async (req, res) => {
  try {
    const body = await updatePriceSchema.validateAsync(req.body);
    const bitcoin = await bitcoinService.updatePrice(body.price);

    logger.logResponse(bitcoin);
    res.send(bitcoin);
  } catch (err) {
    logger.logError(err.message);
    res.status(422).json({message: err.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const bitcoin = await bitcoinService.getBitcoin();

    logger.logResponse(bitcoin);
    res.send(bitcoin);
  } catch (err) {
    logger.logError(err.message);
    res.status(400).json({message: err.message});
  }
});

module.exports = router;