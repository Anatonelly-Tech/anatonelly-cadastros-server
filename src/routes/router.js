const router = require('express').Router();

const driverRouter = require('./driver');
const accountRouter = require('./account');

router.use('/', driverRouter);
router.use('/', accountRouter);

module.exports = router;
