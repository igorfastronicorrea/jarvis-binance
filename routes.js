'use sctrict';
const actions = require('./actions');

const express = require('express');
const router = express.Router();


router.get('/account', actions.myWallet)


module.exports = router;