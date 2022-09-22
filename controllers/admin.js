const db = require('../models');
const Sequelize = require('sequelize');
const generator = require('generate-password');
const bcrypt = require('bcrypt');
const mailjet = require('../config/mailjet');



exports.getAllPartners = (req, res, next) => {
    db.partner.findAll({ include: [{ model: db.module }, { model: db.user }] })
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
    let Password = generator.generate({
        length: 10,
        numbers: true
    })
    bcrypt.hash(Password, 10)
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
                        email: req.body.email,
                        description: req.body.description,
                        UserId: user.id
                    });
                    partner.save()
                    return partner
                })
                .then((partner) => {
                    const request = mailjet
                        .post("send", { 'version': 'v3.1' })
                        .request({
                            "Messages": [
                                {
                                    "From": {
                                        "Email": "paul@paul-dem.com",
                                        "Name": "Admin HappySport"
                                    },
                                    "To": [
                                        {
                                            "Email": partner.email,
                                            "Name": partner.name
                                        }
                                    ],
                                    "Subject": "Nouveau partenaire créé",
                                    "TextPart": "Félicitation, votre compte partenaire vient d'être créé !",
                                    "HTMLPart": `<h1>Bienvenue chez HappySport " ${partner.name} "</h1><br /><h3>Vous pouvez dès à présent vous connecter, voici vos identifiants : </h3><br />Login : ${email}  <br />   Mot de passe :   ${Password}  <br /><p><strong><a href="">N'oubliez pas de changer votre mot de passe lors de la première connexion directement sur votre profil.</a></strong></p><br /><h6>Vous pouvez répondre à ce mail si vous avez besoin de contacter l'administrateur, n'hésitez pas à conserver ce mail sans durée de limite.</h6>`,
                                    "CustomID": "AppGettingStartedTest"
                                }
                            ]
                        })
                    request
                        .then((result) => {
                            console.log(result.body)
                        })
                        .catch((err) => {
                            console.log(err.statusCode)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .then(() => {
            req.flash('message', 'Le nouveau partenaire a bien été enregistré. Un mail de confirmation vient d\'être envoyé à l\'adresse mail  ' + req.body.email)
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
            res.render('new-module', { message: req.flash('message') })
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
            mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [
                        {
                            "From": {
                                "Email": "paul@paul-dem.com",
                                "Name": "Admin HappySport"
                            },
                            "To": [
                                {
                                    "Email": partner.email,
                                    "Name": partner.name
                                }
                            ],
                            "Subject": "Modification d'un ou plusieurs modules lié à votre compte",
                            "TextPart": "Des modules viennent d'être modifiés !",
                            "HTMLPart": "<h1>Bonjour " + partner.name + "</h1><br /><h3>Des modules liés à votre profil viennent d'être modifiés. </h3><br /> Vous retrouverez le détail des informations en vous connectant sur votre interface HappySport. <br /><h6><strong>N'hésitez pas à répondre à ce mail pour contacter l'administrateur !</strong></h6>",
                            "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })
                .then((result) => console.log(result.body))
                .catch((err) => {
                    req.flash('error')
                    res.render('admin-index', { error: err })
                })
            return partner
        })
        .then((partner) => {
            partner.save();
            res.redirect('/admin');
        })
};

exports.getOnePartner = (req, res, next) => {
    db.partner.findOne({
        where: { id: req.params.id },
        include: [{
            model: db.module,
            through: { attributes: [] }
        },
        {
            model: db.user
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
        let Password = generator.generate({
            length: 10,
            numbers: true
        })
        bcrypt.hash(Password, 10)
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
                            email: req.body.email,
                            description: req.body.description,
                            city: req.body.city,
                            street: req.body.street,
                            postal_code: req.body.postalCode,
                            UserId: user.id,
                            PartnerId: req.body.partner
                        },
                            {
                                include: [
                                    {
                                        model: db.partner,
                                        as: "Partner"
                                    }
                                ]
                            }
                        )
                        hall.save()
                        return hall
                    }).then((hall) => {
                        db.partner.findOne({
                            where: { id: hall.PartnerId }
                        })
                            .then((partner) => {
                                mailjet
                                    .post("send", { 'version': 'v3.1' })
                                    .request({
                                        "Messages": [
                                            {
                                                "From": {
                                                    "Email": "paul@paul-dem.com",
                                                    "Name": "Admin HappySport"
                                                },
                                                "To": [
                                                    {
                                                        "Email": partner.email,
                                                        "Name": partner.name
                                                    }
                                                ],
                                                "Subject": "Nouvelle salle créée",
                                                "TextPart": "Une nouvelle salle vient d'être créeé !",
                                                "HTMLPart": "<h1>Bonjour " + partner.name + "</h1><br /><h3>Une nouvelle salle vient d'être créée, voici ses informations : </h3><br />Nom : " + hall.name + " <br /> " + "Mail contact :  " + hall.email + "<br /> Vous retrouverez le détail des informations en vous connectant sur votre interface HappySport. <br /><h6><strong>N'hésitez pas à répondre à ce mail si vous avez besoin de contacter l'administrateur.</strong></h6>",
                                                "CustomID": "AppGettingStartedTest"
                                            }
                                        ]
                                    })
                                    .catch((err) => {
                                        req.flash('error')
                                        res.render('admin-index', { error: err })
                                    })

                            })
                        const request = mailjet
                            .post("send", { 'version': 'v3.1' })
                            .request({
                                "Messages": [
                                    {
                                        "From": {
                                            "Email": "paul@paul-dem.com",
                                            "Name": "Admin HappySport"
                                        },
                                        "To": [
                                            {
                                                "Email": req.body.email,
                                                "Name": req.body.name
                                            }
                                        ],
                                        "Subject": "Nouvelle salle créée",
                                        "TextPart": "Félicitation, votre compte structure vient d'être créé !",
                                        "HTMLPart": `<h1>Bienvenue chez HappySport " ${req.body.name} "</h1><br /><h3>Vous pouvez dès à présent vous connecter, voici vos identifiants : </h3><br />Login : ${email}  <br />   Mot de passe :   ${Password}  <br /><p><strong><a href="">N'oubliez pas de changer votre mot de passe lors de votre première connexion en vous rendant sur votre profil.</a></strong></p><br /><h6>Vous pouvez répondre à ce mail si vous avez besoin de contacter l'administrateur, n'hésitez pas à conserver ce mail.</h6>`,
                                        "CustomID": "AppGettingStartedTest"
                                    }
                                ]
                            })
                            .catch((err) => {
                                req.flash('error')
                                res.render('admin-index', { error: err })
                            })
                    })
            })

            .then(() => {
                db.partner.findAll()
                    .then((partners) => {
                        req.flash('message', 'La nouvelle salle a bien été créée. Un mail de confirmation a été envoyé aux mails de contact. ')
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
        }, {
            model: db.module
        },
        {
            model: db.user
        }]
    })
        .then((halls) => {
            res.render('all-hall', { hall: halls })
        })
};

exports.updateHall = (req, res, next) => {
    db.hall.findOne({
        where: { id: req.params.id },
        include: [{ model: db.module }, { model: db.partner, as: "Partner" }]
    })
        .then((hall) => {
            hall.set({
                name: req.body.name,
                email: req.body.email,
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
            mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [
                        {
                            "From": {
                                "Email": "paul@paul-dem.com",
                                "Name": "Admin HappySport"
                            },
                            "To": [
                                {
                                    "Email": hall.email,
                                    "Name": hall.name
                                }
                            ],
                            "Subject": "Modifications liées à votre compte",
                            "TextPart": "Des modifications ont été effectuées sur votre compte HappySport",
                            "HTMLPart": "<h1>Bonjour " + hall.name + "</h1><br /><h3>Des informations liées à votre compte viennent d'être modifiées par un administrateur. Nous vous invitons à les consulter sur votre compte HappySport. </h3><br />Vous retrouverez le détail des informations en vous connectant sur votre interface. <br /><h6><strong>Vous pouvez répondre à ce mail pour contacter votre administrateur !</strong></h6>",
                            "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })
                .catch((err) => {
                    req.flash('error')
                    res.render('all-hall', { error: err })
                })
            return hall
        })
        .then((hall) => {
            mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [
                        {
                            "From": {
                                "Email": "paul@paul-dem.com",
                                "Name": "Admin HappySport"
                            },
                            "To": [
                                {
                                    "Email": hall.Partner.email,
                                    "Name": hall.Partner.name
                                }
                            ],
                            "Subject": "Modifications liées à l'une de votre structure",
                            "TextPart": "Des modifications ont été effectuées sur l'une de votre structure",
                            "HTMLPart": "<h1>Bonjour " + hall.Partner.name + "</h1><br /><h3>Des informations liées à l'une de votre salle viennent d'être modifiées par un administrateur. Nous vous invitons à les consulter sur votre compte HappySport. </h3><br />Vous retrouverez le détail des informations en vous connectant sur votre interface HappySport. <br /><h6><strong>Vous pouvez répondre à ce mail pour contacter votre administrateur.</strong></h6>",
                            "CustomID": "AppGettingStartedTest"
                        }
                    ]
                })
                .catch((err) => {
                    req.flash('error')
                    res.render('all-hall', { error: err })
                })
            return hall
        })
        .then((hall) => {
            hall.save()
            req.flash('message', 'La salle a bien été modifiée')
            res.render('all-hall', { message: req.flash('message') })
        })
        .catch((err) => {
            req.flash('error')
            res.render('all-hall', { error: err })
        })
};

exports.deleteHall = (req, res, next) => {
    db.hall.findOne({
        where: { id: req.params.id }
    })
        .then((hall) => {
            let user = db.user.findOne({
                where: { id: hall.UserId }
            })
            hall.destroy()
            return user
        })
        .then((user) => {
            user.destroy();
        })
        .then(() => {
            req.flash('message', 'La salle a bien été supprimée ');
            res.render('all-hall', { message: req.flash('message') });
        })
        .catch((err) => {
            req.flash('error')
            res.render('all-hall', { error: err })
        })
};

exports.deletePartner = async (req, res, next) => {
    await db.Partner.findOne({
        where: { id: req.params.id }
    })
        .then((partner) => {
            console.log(partner)
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
            res.render('get-hall', { hall: hall })
        })
        .catch((err) => {
            req.flash('error')
            res.render('get-hall', { error: err })
        })
};