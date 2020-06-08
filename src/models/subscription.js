const mongoose = require('mongoose');
const moment = require('moment');

const opts = {
  versionKey: false,
  toJSON: {
    virtuals: true
  }
};

const SubscriptionSchema = mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nextInvoice: {
    type: Date,
    default: Date.now
  },
  referenceDate: {
    type: Date,
    default: Date.now
  }
}, opts);

SubscriptionSchema.virtual('state')
  .get(function () {
    const random = Math.floor(Math.random() * 3)

    switch (random) {
      case 0: return 'Active';
      case 1: return 'Pending';
      case 2: return 'Cancelled';
    }
  });

module.exports = mongoose.model('Subscription', SubscriptionSchema);