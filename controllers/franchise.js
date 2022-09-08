const db = require('../models');
const Sequelize = require('sequelize');
const passport = require('../config/passport')

exports.getAllHall = (req, res, next) => {
    db.partner.findOne({
        where: {UserId: req.user.id},
        include: [{
            model: db.module,
            through: { attributes: [] },
        },
        {
            model: db.hall,
            as: 'Halls',
            include: [db.module]
        }
    ]
    })
    .then((partner) => {
        res.render('franchise-index', {partner: partner})
    })
};

exports.getHall = (req, res, next) => {
    db.hall.findOne({
        where: {id: req.params.id},
        include: [{
            model: db.partner,
            as: 'Partner',
            include: [db.module]
        },{
            model: db.module
        }]
    })
    .then((hall) => {
         res.render('get-hall-franchise', {hall: hall})
    })
    .catch((err) => {
        req.flash('error')
        res.render('get-hall-franchise', { error: err })
    })
}
