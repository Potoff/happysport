const express = require('express');
const router = express.Router();
const passport = require('passport');
const franchiseCtrl = require('../controllers/franchise');

router.get('/', franchiseCtrl.getAllHall);

router.get('/getHall/:id', franchiseCtrl.getHall);

module.exports = router;