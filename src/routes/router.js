const router = require('express').Router();

const driverRouter = require('./driver');
const routeRouter = require('./route');
const authRouter = require('./auth');

router.use('/', driverRouter);
router.use('/', routeRouter);
router.use('/', authRouter);

module.exports = router;
