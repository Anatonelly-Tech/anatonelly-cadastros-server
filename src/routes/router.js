const router = require('express').Router();

const driverRouter = require('./driver');

router.use('/', driverRouter);

module.exports = router;
