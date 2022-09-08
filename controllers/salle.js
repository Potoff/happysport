const db = require('../models');
const Sequelize = require('sequelize');
const passport = require('../config/passport')

exports.getHall = (req, res, next) => {
    db.hall.findOne({
        where: { UserId: req.user.id },
        include: [{
            model: db.module,
            through: { attributes: [] },
        },
        {
            model: db.partner,
            as: 'Partner'
        }
        ]
    })
        .then((hall) => {
            res.render('salle-index', { hall: hall })
        })
        .catch((err) => {
            req.flash('error')
            res.render('get-hall-franchise', { error: err })
        })
}