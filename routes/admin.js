const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminCtrl = require('../controllers/admin');

router.get('/', adminCtrl.getAllPartners);

router.get('/addPartnerForm', adminCtrl.addPartnerForm);

router.get('/addModuleForm', adminCtrl.addModuleForm);

router.get('/newHallForm', adminCtrl.newHallForm);

router.post('/newPartner', adminCtrl.newPartner);

router.get('/deletePartner/:id', adminCtrl.deletePartner);

router.post('/newModule', adminCtrl.newModule);

router.get('/deleteModule/:id', adminCtrl.deleteModule);

router.get('/getUpdatePartnerForm/:id', adminCtrl.getOnePartnerUpdateForm);

router.post('/updatePartner/:id', adminCtrl.updateOnePartner);

router.post('/newHall', adminCtrl.newHall)

router.get('/allHall', adminCtrl.getAllHall)

router.get('/getPartner/:id', adminCtrl.getOnePartner)


module.exports = router;