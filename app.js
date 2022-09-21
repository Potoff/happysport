// App Constantes
const express = require('express');
const app = express();
const path = require('path');
const createError = require('http-errors');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash-plus');
const cors = require('cors');
require('./config/passport');
require('hbs');

// Router Constantes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const franchiseRouter = require('./routes/franchise');
const salleRouter = require('./routes/salle');


// App Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(session({
    secret: 'rabbit hole is the new cassoulet',
    resave: true,
    saveUninitialized: true
}));

// Flash message Middleware
app.use(flash());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Router Middleware
app.use('/user', userRouter);
app.use('/admin', (req, res, next) => {
    if (req.isAuthenticated() && req.user.RoleId === 1) {
        return next()
    }
    req.flash('error', 'Vous devez être connecté et administrateur pour acceder à cette page !')
    res.render('index', { message: req.flash('error') })
}, adminRouter);

app.use('/franchise', (req, res, next) => {
    if (req.isAuthenticated() && req.user.RoleId === 2) {
        return next()
    }
    req.flash('error', 'Vous devez être connecté et administrateur de franchise pour acceder à cette page !')
    res.render('index', { message: req.flash('error') })
}, franchiseRouter);

app.use('/salle',(req, res, next) => {
    if(req.isAuthenticated() && req.user.RoleId === 3){
        return next()
    }
    req.flash('error', 'Vous devez être connecté être gérant de salle pour acceder à cette page !')
    res.render('index', { message: req.flash('error') })
}, salleRouter);

app.use('/', indexRouter);
app.use('/logout', (req, res, next) => {
    req.logout(() => {
        res.redirect('/');
    });
})

//Middleware to catch an error and fast-forward to next middlewar error handler
app.use((req, res, next) => {
    next(createError(404));
})
//error handler
app.use((err, req, res, next) => {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;