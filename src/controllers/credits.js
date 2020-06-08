const Credit = require('../models/credit');

// Get list of credits
const getList = (req, res) => {
  const {skip = 0, limit = 20, sortColumn = '_id', sortType = 'asc', accountId} = req.query
  const findOptions = accountId ? {accountId} : {}

  Credit.find(findOptions)
    .skip(+skip)
    .limit(+limit)
    .sort(({[sortColumn]: sortType}))
    .exec((err, credits) => {
      if (err) {
        res.json({
          status: 'error',
          message: err
        });
      }

      res.json({
        status: 'success',
        result: credits
      });
    });
};

// Get credits
const getOnce = (req, res) => {
  Credit.findById(req.params.id, (err, credit) => {
    if (err)
      res.send(err);
    res.json({
      message: 'Account details loading..',
      result: credit
    });
  });
};

// Create credit
const create = (req, res) => {
  const credit = new Credit();

  delete req.body._id
  Object.assign(credit, req.body, {state: 'Active'})

  credit.save(err => {
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
      message: 'Credit created',
      result: credit
    });
  });
};

// Update credit
const update = (req, res) => {
  Credit.findById(req.params.id, (err, credit) => {
    if (err) res.send(err);

    Object.assign(credit, req.body)

    credit.save(err => {
      if (err) res.json(err);

      res.json({
        message: 'Account Info updated',
        result: credit
      });
    });
  });
};

// Delete credit
const remove = (req, res) => {
  Credit.findOneAndDelete({_id: req.params.id},
    (err, credit) => {
      if (err) res.send({
        status: 'error',
        message: err.message
      });

      res.json({
        message: 'Credit expired',
        result: credit
      });
    });
};

module.exports = {getList, getOnce, create, update, remove}