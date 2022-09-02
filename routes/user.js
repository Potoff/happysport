const express = require('express');
const router = express.Router();
const passport = require('passport');



const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', passport.authenticate('local', {
        failureRedirect: '/',
        failureFlash: true
    } 
    ) , userCtrl.login
);

module.exports = router;