const db = require('../models');
const User = db.user;
const Role = db.role;
const Partner = db.partner;
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
     User.findOne({ where: { email: req.body.email }, include: 'Role' })
        .then(user => {
            if (user.Role.type === 'admin') {
                res.redirect('/admin');
            } else if (user.Role.type === 'franchise') {
                res.redirect('/franchise');
            } else if (user.Role.type === 'salle') {
                res.redirect('/salle');
            } else {
                res.render('error', { message: 'utilisateur non identifié' })
            }
        })
        .catch(error => res.status(500).json({ error: error })); 
}; 




