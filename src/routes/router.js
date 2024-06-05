const router = require('express').Router();

const driverRouter = require('./driver');
const routeRouter = require('./route');
const authRouter = require('./auth');
const wordEditRouter = require('./wordEdit/contract');

router.use('/', driverRouter);
router.use('/', routeRouter);
router.use('/', authRouter);
router.use('/', wordEditRouter);

module.exports = router;
