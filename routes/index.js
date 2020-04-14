const router = require('express').Router();
const accountsController = require('../controllers/accounts');
const creditsController = require('../controllers/credits');

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

// Credits
router.route('/credits')
  .get(creditsController.getList)
  .post(creditsController.create);

module.exports = router;