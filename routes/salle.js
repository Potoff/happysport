const express = require('express');
const router = express.Router();
const passport = require('passport');

const hallCtrl = require('../controllers/salle');

router.get('/', hallCtrl.getHall);

module.exports = router;