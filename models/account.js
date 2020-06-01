const mongoose = require('mongoose');
const moment = require('moment');

const opts = {
  versionKey: false,
  toJSON: {
    virtuals: true
  }
};

const AccountSchema = mongoose.Schema({
  billingAddress: {
    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    city: String,
    country: String,
    postcode: String,
    province: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    // validate: {
    //   isAsync: true,
    //   validator: (v, cb) => {
    //     cb(isEmail(v));
    //   },
    //   message: '{VALUE} is not a valid email'
    // }
  },
  company: String,
  phone: String,
  created: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  logoURL: String,
  metadata: Object,
  successfulSubscriptions: Number
}, opts);

AccountSchema.virtual('state')
  .get(function () {
    const ACTIVE_STATE_DAYS = 90; // Count of days before the current day for 'Active' state
    const dateDiff = moment().diff(this.created, 'days')

    if (dateDiff > 0 && dateDiff <= ACTIVE_STATE_DAYS) {
      return 'Active'
    } else if (dateDiff < 0) {
      return 'Pending'
    } else {
      return 'Inactive'
    }
  });

module.exports = mongoose.model('Account', AccountSchema);