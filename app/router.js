const express = require('express')
const router = express.Router()

const userController = require('./user/controller');
const bitcoinController = require('./bitcoin/controller');

router.use('/users', userController);
router.use('/bitcoin', bitcoinController);

module.exports = router;