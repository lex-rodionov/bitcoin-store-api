const mongoose = require('mongoose');
const {BTC} = require('./constants');

const bitcoinSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    default: BTC,
  },
  price: {
    type: Number,
    required: true,
    default: 100,
  }
}, {
  timestamps: true,
  versionKey: false,
});

module.exports = mongoose.model('bitcoin', bitcoinSchema);