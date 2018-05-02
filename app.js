let createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    env = require('dotenv').load(),
    fileUpload = require('express-fileupload'),
    flash = require('connect-flash');

//Exported models
let models = require("./app/models");

//Sync Database
if (process.env.NODE_ENV === 'production') {
    models.sequelize.sync().then(function() {}).catch(function(err) {
        throw new Error(err);
    });
}

if (process.env.NODE_ENV === 'development') {
    models.sequelize.sync(/*{force: true}*/).then(function() {
        //require('./app/config/initial_data/index')(models);
    }).catch(function(err) {
        throw new Error(err);
    });
}

let app = express();

let passport   = require('passport');
let session    = require('express-session');
let bodyParser = require('body-parser');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For passport flash messages
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

/**
 * UI Routes
 */
let indexRouteUI = require('./app/routes/ui/index.js')(app);
let privacyPolicyRouteUI = require('./app/routes/ui/privacyPolicy.js')(app);
let termsOfUseRouteUI = require('./app/routes/ui/termsOfUse.js')(app);

/**
 * Admin Routes
 */
let indexRouteAdmin = require('./app/routes/admin/index.js')(app);
let authRouteAdmin = require('./app/routes/admin/auth.js')(app, passport);
let addDataRouteAdmin = require('./app/routes/admin/addData.js')(app);
let allDataRouteAdmin = require('./app/routes/admin/allData.js')(app);
let configurationsAdmin = require('./app/routes/admin/configurations.js')(app);

/**
 * Load passport strategies
 */
require('./app/config/passport/passport.js')(passport, models.users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
