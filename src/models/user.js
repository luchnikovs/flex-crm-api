const mongoose = require('mongoose');
const bCrypt = require('bcrypt');

const opts = {
  versionKey: false
};

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
}, opts)

UserSchema.pre('save', function (next) {
  const user = this;

  bCrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

const User = mongoose.model('User', UserSchema);

module.exports = User