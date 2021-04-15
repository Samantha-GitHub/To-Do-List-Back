const router = require('express').Router();

const userApiRouter = require('./api/user');
const choresApiRouter = require('./api/chores');

router.use('/user', userApiRouter);
router.use('/chores', choresApiRouter);

module.exports = router;
