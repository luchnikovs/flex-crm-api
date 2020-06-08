const mongoose = require('mongoose');

const dbConnect = async () => {
  await mongoose.connect(
    process.env.DB_URL,
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