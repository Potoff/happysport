//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
const db = require('../models');
const User = db.user;
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
//
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email",
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, email, password, done) {
    // When a user tries to sign in this code runs
    const users = await User.findOne({ where: { email: email }, include: 'Role' }) 
      .then((user) => {
        if(!user){
          return done(null, false, {
            messages: 'Utilisateur inconnu'
          })
        }
        bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
            if(!valid){
              return done(null, false, {
                messages: 'Mot de passe invalide'          
              })
            } else {
              return done(null, user);
            }
          })  
          .catch((err) =>{
            console.log(err)
            return done(err)
          })
        
      }) 
      .catch((err) => {
        console.log(err)
        return done(err)
      })
  }
));
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findByPk(id).then(function(user) { done(null, user); });
});
//
// Exporting our configured passport
module.exports = passport;
