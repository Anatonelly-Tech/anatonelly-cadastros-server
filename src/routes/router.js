const router = require('express').Router();

const driverRouter = require('./driver');
const accountRouter = require('./account');

router.use('/', accountRouter);
router.use('/', driverRouter);

module.exports = router;
