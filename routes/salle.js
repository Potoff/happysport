const express = require('express');
const router = express.Router();

const salleCtrl = require('../controllers/salle');

router.get('/', (req, res, next) => {
    res.render('salle-index.hbs')
})

module.exports = router;