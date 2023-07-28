const Bitcoin = require('./model');
const {BTC} = require('./constants');

const bitcoinService = {
  async updatePrice(price) {
    let bitcoin = await Bitcoin.findOne({ code: BTC}).exec();

    if (bitcoin) {
      bitcoin.price = price;
    } else {
      bitcoin = await Bitcoin({ code: BTC, price });
    }

    const result = await bitcoin.save();
    return this._formatBitcoin(result);
  },

  async getBitcoin() {
    let bitcoin = await Bitcoin.findOne({ code: BTC}).exec();

    if (!bitcoin) {
      bitcoin = await Bitcoin({});
    }

    const result = await bitcoin.save();
    return this._formatBitcoin(result);
  },

  _formatBitcoin(bitcoin) {
    return {
      price: bitcoin.price,
      updatedAt: bitcoin.updatedAt,
    }
  }
};

module.exports = bitcoinService;