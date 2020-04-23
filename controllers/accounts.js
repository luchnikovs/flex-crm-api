const Account = require('../models/account');

// Get list of accounts
const getList = (req, res) => {
  const {skip = 0, limit = 20, sortColumn = '_id', sortType = 'asc'} = req.query

  Account.find()
    .skip(+skip)
    .limit(+limit)
    .sort(({[sortColumn]: sortType}))
    .exec((err, accounts) => {
      if (err) {
        res.json({
          status: 'error',
          message: err
        });
      }

      res.json({
        status: 'success',
        result: accounts
      });
    });
};

// Get account
const getOnce = (req, res) => {
  Account.findById(req.params.id, (err, account) => {
    if (err)
      res.send(err);
    res.json({
      message: 'Account details loading..',
      result: account
    });
  });
};

// Create account
const create = (req, res) => {
  const account = new Account();

  delete req.body._id

  account.save(err => {
    if (err) {
      if(err.name === 'ValidationError') {
        return res.status(400).send({
          message: err.message
        });
      } else {
        return res.status(500).send({
          message: 'Server error'
        });
      }
    }

    return res.status(200).json({
      message: 'Account created',
      result: account
    });
  });
};

// Update account
const update = (req, res) => {
  Account.findById(req.params.id, (err, account) => {
    if (err) res.send(err);

    Object.assign(account, req.body)

    account.save(err => {
      if (err) res.json(err);

      res.json({
        message: 'Account Info updated',
        result: account
      });
    });
  });
};

// Delete account
const remove = (req, res) => {
  Account.findOneAndDelete({_id: req.params.id},
    (err, account) => {
      if (err) res.send({
        status: 'error',
        message: err.message
      });

      res.json({
        message: 'Account deleted',
        result: account
      });
    });
};

module.exports = {getList, getOnce, create, update, remove}