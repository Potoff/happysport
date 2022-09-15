const express = require('express');
const router = express.Router();
const db = require('../models')

//Rendering home page
router.get('/', (req, res, next) => {
        res.render('index', { error: req.flash('error') });
});

router.get('/api/partners', (req, res, next) => {
        db.partner.findAll({ include: [{ model: db.module }, { model: db.user }] })
        .then((partners) => {
            db.module.findAll({ include: db.partner })
                .then((modules) => {
                    res.json([partners, modules])
                })

        })
})

module.exports = router;