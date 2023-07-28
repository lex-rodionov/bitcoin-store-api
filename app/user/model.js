const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bitcoinAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  usdBalance: {
    type: Number,
    required: true,
    default: 0,
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_, ret) => {
      if (ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
   },
});

module.exports = mongoose.model('user', userSchema);