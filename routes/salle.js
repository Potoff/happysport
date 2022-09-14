const express = require('express');
const router = express.Router();
const passport = require('passport');

const hallCtrl = require('../controllers/salle');

router.get('/', hallCtrl.getHall);

router.get('/passwordForm', hallCtrl.changePasswordForm)

router.post('/changePassword', hallCtrl.changePassword)

module.exports = router;