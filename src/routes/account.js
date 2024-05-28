const router = require('express').Router();

const accountController = require('../controllers/accountController');

router.route('/account').post((req, res) => accountController.create(req, res));

router.route('/account').get((req, res) => accountController.getAll(req, res));

router
  .route('/account/:id')
  .get((req, res) => accountController.getById(req, res));

module.exports = router;
