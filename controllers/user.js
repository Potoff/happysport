const db = require('../models');
const User = db.user;
const Role = db.role;
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                RoleId: req.body.RoleId
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email }, include: 'Role' })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe BCRYPT incorrecte' });
                    }
                    /*Réponse initiale en JSON => Voir pour chainer avec un res.render et à garder pour ajouter le token avec l'AUTH
                        res.status(200).json({
                        userId: user._id,
                        token: 'TOKEN',
                        message: 'Utilisateur authentifié'
                    });*/
                    if (user.Role.type === 'admin') {
                        res.redirect('/admin');
                    } else if (user.Role.type === 'franchise') {
                        res.redirect('/franchise');
                    } else if (user.Role.type === 'sale'){
                        res.redirect('/salle');
                    } else {
                        res.render('error', {message: 'utilisateur non identifié'})
                    }
                })
                .catch(error => res.status(500).json({ error: error }));
        })
        .catch(error => res.status(500).json({ error: error }));
};



