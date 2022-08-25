const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminCtrl = require('../controllers/admin');

router.get('/', adminCtrl.getAllPartners);

router.get('/addPartnerForm', adminCtrl.addPartnerForm);

router.post('/newPartner', adminCtrl.newPartner);

router.get('/deletePartner/:id', adminCtrl.deletePartner);

// router.post('/newPartner', adminCtrl.newPartner);

module.exports = router;