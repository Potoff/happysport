const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
                res.render('admin-index')
})

module.exports = router;