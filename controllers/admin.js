const db = require('../models');
const Sequelize = require('sequelize');
const generator = require('generate-password');
const bcrypt = require('bcrypt');



exports.getAllPartners = (req, res, next) => {
    db.partner.findAll({ include: db.module })
        .then((partners) => {
            db.module.findAll({ include: db.partner })
                .then((modules) => {
                    res.render('admin-index', {
                        partners: partners,
                        modules: modules
                    })
                })

        })
        .catch((err) => {
            req.flash('error')
            res.render('admin-index', { error: err });
        })
};

exports.addPartnerForm = (req, res, next) => {
    res.render('new-partner');
};

exports.newHallForm = (req, res, next) => {
    db.partner.findAll().then((partners) => {
        res.render('new-hall', {
            partners: partners
        });
    })

}

exports.addModuleForm = (req, res, next) => {
    db.Module.findAll()
        .then((modules) => {
            res.render('new-module', { modules: modules })
        })
        .catch((err) => {
            req.flash('error')
            res.render('admin-index', { error: err })
        })

};

exports.newPartner = (req, res, next) => {
    let email = req.body.name.split(' ').join('').toLowerCase() + '@happysport.com'
    let password = generator.generate({
        length: 10,
        numbers: true
    })
    bcrypt.hash(password, 10)
        .then((password) => {
            const user = new db.User({
                email: email,
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
            req.flash('message', 'Le nouveau partenaire a bien été enregistré avec le mot de passe suivant : ' + password + ' et l\'adresse mail suivante : ' + email)
            res.render('new-partner', { message: req.flash('message') });
        })
        .catch((err) => {
            req.flash('error')
            res.render('new-partner', { error: err })
        })
};
// Détuire user en même temps que partner
exports.deletePartner = async (req, res, next) => {
    await db.Partner.findOne({
        where: { id: req.params.id }
    })
        .then((partner) => {
            const user = db.User.findOne({
                where: { id: partner.UserId }
            })
            partner.destroy();
            return user
        })
        .then((user) => {
            user.destroy();
        })
        .then(() => {
            req.flash('message', 'Le partenaire a bien été supprimé ')
            res.render('admin-index', { message: req.flash('message') });
        })
        .catch((err) => {
            req.flash('error')
            res.render('admin-index', { error: err })
        })
};

exports.newModule = (req, res, next) => {
    const module = new db.Module({
        name: req.body.name,
        description: req.body.description
    })
    module.save()
        .then((module) => {
            req.flash('message', 'Le module a bien été créé ')
            res.render('new-module', { message: req.flash('message') });
        })
        .catch((err) => {
            req.flash('error')
            res.render('new-module', { error: err })
        })
};

exports.updateModule = (req, res, next) => {
    db.module.findOne({
        where: { id: req.params.id }
    })
        .then((module) => {
            module.set({
                name: req.body.name,
                description: req.body.description
            })
            return module
        })
        .then((module) => {
            module.save()
            req.flash('message', 'Le module a bien été modifié')
            res.render('new-module', {message: req.flash('message')})
        })
        .catch((err) => {
            req.flash('error')
            res.render('new-module', { error: err })
        })
};

exports.deleteModule = (req, res, next) => {
    db.Module.findOne({
        where: { id: req.params.id }
    })
        .then((module) => {
            module.destroy()
        })
        .then(() => {
            req.flash('message', 'Le module a bien été supprimé ')
            res.render('new-module', { message: req.flash('message') });
        })
        .catch((err) => {
            req.flash('error')
            res.render('new-module', { error: err })
        })
};

exports.getOnePartnerUpdateForm = (req, res, next) => {
    db.partner.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.module,
            through: { attributes: [] }
        }]
    })
        .then((partner) => {
            db.module.findAll({ include: db.partner })
                .then((modules) => {
                    res.render('update-partner', {
                        partner: partner,
                        partnerModules: partner.Modules,
                        modules: modules
                    })
                })
        })
        .catch((err) => {
            req.flash('error')
            res.render('update-partner', { error: err })
        })

};

exports.updateOnePartner = (req, res, next) => {
    db.partner.findOne({
        where: { id: req.params.id },
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
            if (req.body.is_active === 'false') {
                db.hall.findAll({
                    where: { PartnerId: partner.id }
                }).then((partnersHalls) => {
                    partnersHalls.forEach(hall => {
                        hall.update({
                            is_active: 'false'
                        })
                    });
                    return partner;
                })
            }

            partner.set({
                name: req.body.name,
                email: req.body.email,
                description: req.body.description,
                image_url: req.body.image_url,
                is_active: req.body.is_active
            })

            if (req.body.module) {
                partner.setModules(req.body.module);
                return partner
            }
            else {
                partner.Halls.forEach((hall) => {
                    
                    hall.removeModules(partner.Modules)
                })
                partner.removeModules(partner.Modules);
                return partner
            }

        })
        .then((partner) => {
            partner.save();
            res.redirect('/admin');
        })
        .catch((err) => {
            req.flash('error')
            res.render('admin-index', { error: err })
        })
};

exports.getOnePartner = (req, res, next) => {
    db.partner.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.module,
            through: { attributes: [] }
        }]
    })
        .then((partner) => {
            res.render('get-partner', { partner: partner })
        })
        .catch((err) => {
            req.flash('error')
            res.render('/admin', { error: err })
        })
};

exports.newHall = (req, res, next) => {
    if (req.body.partner === 'Choisir un partenaire associé :') {
        req.flash('error', 'Veuillez choisir un partenaire lié à la salle de sport')
        res.render('new-hall', { error: req.flash('error') })
    } else {
        let email = req.body.name.split(' ').join('').toLowerCase() + '@happysport.com'
        let password = generator.generate({
            length: 10,
            numbers: true
        })
        bcrypt.hash(password, 10)
            .then((password) => {
                const user = new db.user({
                    email: email,
                    password: password,
                    RoleId: 3
                })
                user.save()
                    .then((user) => {
                        const hall = new db.hall({
                            name: req.body.name,
                            email: email,
                            description: req.body.description,
                            city: req.body.city,
                            street: req.body.street,
                            postal_code: req.body.postalCode,
                            UserId: user.id,
                            PartnerId: req.body.partner
                        })
                        hall.save()
                    });
            })
            .then(() => {
                db.partner.findAll()
                    .then((partners) => {
                        req.flash('message', 'La nouvelle salle a bien été enregistré avec l\'adresse mail ' + email + ' mot de passe suivant : ' + password)
                        res.render('new-hall', { partners: partners, message: req.flash('message') });
                    })
                    .catch((err) => {
                        req.flash('error')
                        res.render('new-hall', { error: err })
                    })

            })
            .catch((err) => {
                req.flash('error')
                res.render('new-hall', { error: err })
            })
    }
};

exports.getAllHall = (req, res, next) => {
    db.hall.findAll({
        include: [{
            model: db.partner,
            as: 'Partner',
            include: [db.module]
        },{
            model: db.module
        }]
    })
        .then((halls) => {
            res.render('all-hall', { hall: halls })
            })       
};

exports.updateHall = (req, res, next) => {
    db.hall.findOne({
        where: {id: req.params.id},
        include: [db.module]
    })
    .then((hall) => {
        hall.set({
            name: req.body.name,
            description: req.body.description,
            street: req.body.street,
            postal_code: req.body.postal_code,
            city: req.body.city,
            image_url: req.body.image_url,
            is_active: req.body.is_active
        })

        if (req.body.module) {
            hall.setModules(req.body.module);
            return hall
        }
        else {
            hall.removeModules(hall.Modules)
            return hall
        }
    })
    .then((hall) => {
        hall.save()
        req.flash('message', 'La salle a bien été modifiée')
        res.render('all-hall', {message: req.flash('message')})   
    })
    .catch((err) => {
        req.flash('error')
        res.render('all-hall', {error: err})
    })
};

exports.deleteHall = (req, res, next) => {
    db.hall.findOne({
        where: { id: req.params.id }
    })
        .then((hall) => {
            hall.destroy()
        })
        .then(() => {
            req.flash('message', 'La salle a bien été supprimée ')
            res.render('all-hall', { message: req.flash('message') });
        })
        .catch((err) => {
            req.flash('error')
            res.render('all-hall', { error: err })
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
        console.log(hall)
        res.render('get-hall', {hall: hall})
    })
    .catch((err) => {
        req.flash('error')
        res.render('get-hall', { error: err })
    })
}