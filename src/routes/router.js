const router = require('express').Router();

const driverRouter = require('./driver');
const routeRouter = require('./route');
const authRouter = require('./auth');
const wordEditRouter = require('./wordEdit/contract');
const userRouter = require('./user');

router.use('/', driverRouter);
router.use('/', routeRouter);
router.use('/', authRouter);
router.use('/', wordEditRouter);
router.use('/', userRouter);

module.exports = router;
