const express = require('express');
const router = express.Router();
const passport = require('passport');

const franchiseCtrl = require('../controllers/salle');

router.get('/', (req, res, next) => {
    if (req.isAuthenticated() && req.user.RoleId === 3) {
        res.render('salle-index.hbs')
    } else {
        req.flash('error', 'Vous devez être connecté à votre compte de gestion de salle pour acceder à cette page !')
        res.render('index', { message: req.flash('error') })
    }
})

module.exports = router;