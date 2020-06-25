const router = require('express').Router()
const {isAuth} = require('../services/auth')
const usersController = require('../controllers/users')
const accountsController = require('../controllers/accounts')
const subscriptionsController = require('../controllers/subscriptions')
const creditsController = require('../controllers/credits')

// API check
router.route('/').get((req, res) => {
  res.status(200).send("API works!");
})

// Registration
router.route('/auth/sign-up')
  .post(usersController.createUser)

// Login
router.route('/auth/sign-in')
  .post(usersController.authenticate)

// Accounts
router.route('/accounts')
  .get(isAuth, accountsController.getList)
  .post(isAuth, accountsController.create)

router.route('/accounts/:id')
  .get(isAuth, accountsController.getOnce)
  .patch(isAuth, accountsController.update)
  .put(isAuth, accountsController.update)
  .delete(isAuth, accountsController.remove)

// Payment Methods
router.route('/payment-methods')
  .get(isAuth, (req, res) => {
    res.send('Get Payment Method works')
  })

// Subscriptions
router.route('/subscriptions')
  .get(isAuth, subscriptionsController.getList)
  .post(isAuth, subscriptionsController.create)

// Credits
router.route('/credits')
  .get(isAuth, creditsController.getList)
  .post(isAuth, creditsController.create)

module.exports = router;