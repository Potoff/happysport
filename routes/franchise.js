const express = require('express');
const router = express.Router();
const passport = require('passport');
const franchiseCtrl = require('../controllers/franchise');

router.get('/', franchiseCtrl.getAllHall);

router.get('/getHall/:id', franchiseCtrl.getHall);

router.get('/passwordForm', franchiseCtrl.changePasswordForm)

router.post('/changePassword', franchiseCtrl.changePassword)

router.get('/getProfile', franchiseCtrl.getProfile)

module.exports = router;