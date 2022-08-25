const db = require('../models');
const Sequelize = require('sequelize');
const generator = require('generate-password');
const bcrypt = require('bcrypt');


exports.getAllPartners = (req, res, next) => {
    db.Partner.findAll()
        .then((partners) => {
            res.render('admin-index', { partners: partners })
        })
        .catch((err) => {
            res.render('admin-index');
        })
};

exports.addPartnerForm = (req, res, next) => {
    res.render('new-partner')
}

exports.newPartner = (req, res, next) => {
    let password = generator.generate({
        length: 10,
        numbers: true
    })
    bcrypt.hash(password, 10)
        .then((password) => {
            const user = new db.User({
                email: req.body.email,
                password: password,
                RoleId: 2
            })
            user.save()
                .then((user) => {
                    const partner = new db.Partner({
                        name: req.body.name,
                        email: user.email,
                        description: req.body.description,
                        UserId: user.id
                    });
                    partner.save()
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .then(() => {
            req.flash('message', 'Le nouveau partenaire a bien été enregistré avec le mot de passe suivant : ' + password)
            res.render('new-partner', { message: req.flash('message') });
        })
        .catch((err) => {
            req.flash('error')
            res.render('new-partner', { error: err })
        })

}
// Détuire user en même temps que partner
exports.deletePartner = async (req, res, next) => {
   await db.Partner.findOne({
        where: { id: req.params.id }
    })
        .then((partner) => {
            const user = db.User.findOne({
                where: {id : partner.UserId}
            })
            partner.destroy();
            return user
        })
        .then( (user) => {
            user.destroy();
        })
        .then(() => {
            req.flash('message', 'Le partenaire a bien été supprimé ')
            res.render('admin-index', {message: req.flash('message')});
        })
        .catch((err) => {
            req.flash('error')
            res.render('admin-index', { error: err })
        })
}
