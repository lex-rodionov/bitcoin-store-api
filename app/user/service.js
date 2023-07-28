const mongoose = require('mongoose');

const bitcoinService = require('../bitcoin/service');
const User = require('./model');
const {
  TRANSFER_TYPE,
  TRADE_TYPE,
} = require('./constants');

const userService = {
  async signUp(newUser) {
    const user = new User({
      ...newUser,
      bitcoinAmount: 0,
      usdBalance: 0,
    });

    return user.save();
  },

  async getById(id) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    return isValid ? User.findById(id).exec() : null;
  },

  async update(userId, name, email) {
    const user = await this.getById(userId);

    if (user) {
      user.name = name ?? user.name;
      user.email = email ?? user.email;
      return user.save();
    }

    return null;
  },

  async transferMoney(userId, action, amount) {
    const user = await this.getById(userId);
    if (!user) return null;

    user.usdBalance = this._calculateTransfer(user.usdBalance, action, amount);
    return user.save();
  },

  async tradeBitcoin(userId, action, amount) {
    const user = await this.getById(userId);
    if (!user) return null;

    const {bitcoinBalance, usdBalance} = await this._calculateTrade(user, action, amount);

    user.bitcoinAmount = bitcoinBalance;
    user.usdBalance = usdBalance;
    return user.save();
  },

  async getBalance(userId) {
    const user = await this.getById(userId);
    if (!user) return null;

    const {price} = await bitcoinService.getBitcoin();
    const fromUsd = user.usdBalance;
    const fromBitcoin = user.bitcoinAmount * price;

    return {
      total: (fromUsd + fromBitcoin).toFixed(2),
    };
  },

  _calculateTransfer(balance, action, amount) {
    let newBalance = balance;

    if (action === TRANSFER_TYPE.DEPOSIT) {
      newBalance += amount;
    }

    if (action === TRANSFER_TYPE.WITHDRAW) {
      if (balance < amount) {
        throw Error('Insufficient Funds');
      }
      newBalance -= amount;
    }

    return newBalance.toFixed(2);
  },

  async _calculateTrade(user, action, bitcoinAmount) {
    const {price} = await bitcoinService.getBitcoin();
    let bitcoinBalance = user.bitcoinAmount;
    let usdBalance = user.usdBalance;

    if (action === TRADE_TYPE.BUY) {
      bitcoinBalance += bitcoinAmount;
      usdBalance = this._calculateTransfer(
        usdBalance,
        TRANSFER_TYPE.WITHDRAW,
        price * bitcoinAmount,
      );
    }

    if (action === TRADE_TYPE.SELL) {
      if (bitcoinBalance < bitcoinAmount) {
        throw Error('Not Enough Bitcoins');
      }
      bitcoinBalance -= bitcoinAmount;
      usdBalance = this._calculateTransfer(
        usdBalance,
        TRANSFER_TYPE.DEPOSIT,
        price * bitcoinAmount,
      );
    }

    return { usdBalance, bitcoinBalance: bitcoinBalance.toFixed(2) };
  }
};

module.exports = userService;