const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = require('./router');
// const passport = require('passport');
// const flash = require('connect-flash');
// require('./../config/passport')(passport);

/* Constants */
const PORT = 5080;
const HOSTNAME = 'localhost';

const app = express();

// Use PUG as the template engine
app.set('view engine', 'pug');

// /build will be served as static content
app.use(express.static('build'));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// usePassport(app);
// useInterface(app);

app.listen(PORT, HOSTNAME, () => console.log(`Listening on ${HOSTNAME}:${PORT}`));
app.use(router);
app.use(errorNotFound);
app.use(errorHandler);

/**
 *
 * App functions
 *
 **/

function errorNotFound(req, res, next) {
    res.status(404).render('errors/404', {
        page_title: '404',
        content_title: '4-oh-4',
    });
}

function usePassport(_app) {
    // required for passport
    _app.use(session({
        secret: 'thisisaverybigsecretforthegalaxytoneverfindout',
        key: 'id',
        cookie: {
            maxAge: 60000000000,
        },
    }));

    _app.use(passport.initialize());
    _app.use(passport.session());
    _app.use(flash());
}

function useInterface(_app) {
    _app.use(function (req, res, next) {
        res.interface = require('modules/Interface').get();
        next();
    });
}

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err);
    throwError(res, err);
}

function throwError(res, error) {
    res.status(500);
    res.render('error', { error })
}
