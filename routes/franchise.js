const express = require('express');
const router = express.Router();
const passport = require('passport');

const franchiseCtrl = require('../controllers/franchise');

router.get('/', (req, res, next) => {
    res.render('franchise-index.hbs')
})

module.exports = router;