const router = require('express').Router();

const authRouter = require('./user.router');

router.use('/user', authRouter);

// router.get('/', (req, res) => res.json('ok'));
module.exports = router;
