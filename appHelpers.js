const mongoose = require('mongoose');
const config = require('./config');

const dbConnect = async () => {
  await mongoose.connect(
    config.dbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
    err => {
      if (err) return console.log(err);
    }
  )
};

const dbDisconnect = async () => {
  await mongoose.disconnect();
}

module.exports = {dbConnect, dbDisconnect};