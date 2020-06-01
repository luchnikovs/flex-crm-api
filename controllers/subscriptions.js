const Subscription = require('../models/subscription');

// Get list of subscriptions
const getList = (req, res) => {
  const {skip = 0, limit = 20, sortColumn = '_id', sortType = 'asc', accountId} = req.query
  const findOptions = accountId ? {accountId} : {}

  Subscription.find(findOptions)
    .skip(+skip)
    .limit(+limit)
    .sort(({[sortColumn]: sortType}))
    .exec((err, subscriptions) => {
      console.log(subscriptions);

      if (err) {
        res.json({
          status: 'error',
          message: err
        });
      }

      res.json({
        status: 'success',
        result: subscriptions
      });
    });
};

// Get subscription
const getOnce = (req, res) => {
  Subscription.findById(req.params.id, (err, subscription) => {
    if (err)
      res.send(err);
    res.json({
      message: 'Account details loading..',
      result: subscription
    });
  });
};

// Create subscription
const create = (req, res) => {
  const subscription = new Subscription();

  Object.assign(subscription, req.body)

  subscription.save(err => {
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
      message: 'Subscription created',
      result: subscription
    });
  });
};

// Update subscription
const update = (req, res) => {
  Subscription.findById(req.params.id, (err, subscription) => {
    if (err) res.send(err);

    Object.assign(subscription, req.body)

    subscription.save(err => {
      if (err) res.json(err);

      res.json({
        message: 'Account Info updated',
        result: subscription
      });
    });
  });
};

// Delete subscription
const remove = (req, res) => {
  Subscription.findOneAndDelete({_id: req.params.id},
    (err, subscription) => {
      if (err) res.send({
        status: 'error',
        message: err.message
      });

      res.json({
        message: 'Credit expired',
        result: subscription
      });
    });
};

module.exports = {getList, getOnce, create, update, remove}