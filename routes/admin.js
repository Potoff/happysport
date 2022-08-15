const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin');
const  user  = require('../models');

router.get('/', (req, res, next) => {
if(!user){
    res.render('error')
}
    res.render('admin-index.hbs')
})

module.exports = router;