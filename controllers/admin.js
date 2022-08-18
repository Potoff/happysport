const db = require('../models');
const Sequelize = require('sequelize');


exports.getAllPartners = (req, res, next) => {
     db.Partner.findAll()
    .then((partners) => {
        res.render('admin-index', {partners: partners})
    })
    .catch((err) => {
        res.render('admin-index');
    })
};

exports.addPartnerForm = (req, res, next) => {
    res.render('new-partner')
}

exports.newPartner =  (req, res, next) => {
   const partner =  new db.Partner({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    image_url: req.body.image_url
   });
   partner.save()
    .then((partner) =>{
        req.flash('message', 'le nouveau partenaire a été enregistré')
        res.render('new-partner', {partner: partner, message: req.flash('message')});
    })
    .catch((err) => {
        res.render('new-partner', {message: err})
    })
}
