const mongoose = require('mongoose');
const moment = require('moment');

const opts = {
  versionKey: false,
  toJSON: {
    virtuals: true
  }
};

const creditSchema = mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum : ['USD', 'RUB', 'GBP'],
    required: true
  },
  expires: {
    type: Date,
    required: true
  },
  description: String
}, opts);

creditSchema.virtual('state')
  .get(function () {
    const isExpired = moment(new Date()).diff(this.expires, 'seconds') <= 0;

    if (isExpired) {
      return 'Active'
    } else {
      return 'Expired'
    }
  });

module.exports = mongoose.model('Credit', creditSchema);