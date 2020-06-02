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

// UserSchema.statics.authenticate = function (email, password, callback) {
//   return User.findOne({email: email})
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         const err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//
//       bCrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// };

const User = mongoose.model('User', UserSchema);

module.exports = User