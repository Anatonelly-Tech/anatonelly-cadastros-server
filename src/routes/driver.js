const router = require('express').Router();

const driverController = require('../controllers/driverController');

router
  .route('/driver')
  .get((req, res) => driverController.getAll(req, res));

router
  .route('/driver')
  .post((req, res) => driverController.create(req, res));

router
  .route('/driver/:id')
  .get((req, res) => driverController.getById(req, res));

module.exports = router;
