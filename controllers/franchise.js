const db = require('../models');
const Sequelize = require('sequelize');
const passport = require('../config/passport')
const bcrypt = require('bcrypt');

exports.getAllHall = (req, res, next) => {
    db.partner.findOne({
        where: { UserId: req.user.id },
        include: [{
            model: db.module,
            through: { attributes: [] },
        },
        {
            model: db.hall,
            as: 'Halls',
            include: [db.module]
        },
        {
            model: db.user
        }
        ]
    })
        .then((partner) => {
            res.render('franchise-index', { partner: partner })
        })
};

exports.getHall = (req, res, next) => {
    db.hall.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.partner,
            as: 'Partner',
            include: [db.module]
        }, {
            model: db.module
        },
        {
            model: db.user
        }]
    })
        .then((hall) => {
            res.render('get-hall-franchise', { hall: hall })
        })
        .catch((err) => {
            req.flash('error')
            res.render('get-hall-franchise', { error: err })
        })
}

exports.changePasswordForm = (req, res, next) => {
    res.render('change-password-franchise')
}

exports.changePassword = (req, res, next) => {
    db.partner.findOne({
        where: { UserId: req.user.id }
    })
        .then((partner) => {
            db.user.findOne({
                where: { id: partner.UserId }
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
                        res.render('change-password-franchise', { message: req.flash('message') })
                    })
            })
        })
        .catch((err) => {
            req.flash('error')
            res.render('change-password-franchise', { error: err })
        })

}

exports.getProfile = (req, res, next) => {
    db.partner.findOne({
        where: { UserId: req.user.id },
        include: [
            { model: db.module },
            { model: db.user },
        ]
    })
        .then((partner) => {
            res.render('get-profile-franchise', { partner: partner })
        })
        .catch((err) => {
            req.flash('error')
            res.render('change-password-franchise', { error: err })
        })
};
