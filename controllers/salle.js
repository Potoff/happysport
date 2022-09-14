const db = require('../models');
const Sequelize = require('sequelize');
const passport = require('../config/passport');
const bcrypt = require('bcrypt');


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
        },
        {
            model: db.user
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

exports.changePasswordForm = (req, res, next) => {
    res.render('change-password-hall')
};

exports.changePassword = (req, res, next) => {
    db.hall.findOne({
        where: { UserId: req.user.id }
    })
        .then((hall) => {
            db.user.findOne({
                where: { id: hall.UserId }
            }).then((user) => {
                if (req.body.password1 !== req.body.password2 || req.body.password1 + req.body.password2 === '') {
                    req.flash('error', 'Les mots de passe ne correspondent pas, merci de reessayer !')
                    res.render('change-password-franchise', { error: req.flash('error') })
                }
                bcrypt.hash(req.body.password1, 10)
                    .then((password) => {
                        user.set({
                            password: password
                        })
                    })
                    .then(() => {
                        user.save()
                        req.flash('message', 'Le mot de passe a bien été modifié')
                        res.render('change-password-hall', { message: req.flash('message') })
                    })
            })
        })
        .catch((err) => {
            req.flash('error')
            res.render('change-password-hall', { error: err })
        })
};