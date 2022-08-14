const express = require('express');
const app = express();
const path = require('path');
const createError = require('http-errors');


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/', indexRouter);
app.use('/user', userRouter);

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