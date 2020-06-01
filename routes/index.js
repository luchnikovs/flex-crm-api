const router = require('express').Router();
const usersController = require('../controllers/users');
const accountsController = require('../controllers/accounts');
const subscriptionsController = require('../controllers/subscriptions');
const creditsController = require('../controllers/credits');

// API check
router.route('/').get((req, res) => {
  res.status(200).send("API works!");
})

// Auth
// Registration
router.route('/auth/sign-up')
  .post(usersController.createUser)

// Login
router.route('/auth/sign-in')
  .post(usersController.authenticate)


// Accounts
router.route('/accounts')
  .get(accountsController.getList)
  .post(accountsController.create);

router.route('/accounts/:id')
  .get(accountsController.getOnce)
  .patch(accountsController.update)
  .put(accountsController.update)
  .delete(accountsController.remove);

// Payment Methods
router.route('/payment-methods')
  .get((req, res) => {
    res.send('Get Payment Method works')
  })

// Subscriptions
router.route('/subscriptions')
  .get(subscriptionsController.getList)
  .post(subscriptionsController.create);

// Credits
router.route('/credits')
  .get(creditsController.getList)
  .post(creditsController.create);


function requiresLogin(req, res, next) {
  console.log(req.session)
  if (req.session && req.session.userId) {
    return next();
  } else {
    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

module.exports = router;