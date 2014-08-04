var express = require('express');
var md5 = require('MD5');
var path = require('path');
var swig = require('swig');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('mongoskin');

var mongodb = require('mongodb');
var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});




var app = express();



app.use( require('express-force-domain')('http://www.blissautoleasing.com') );

app.use(favicon());
app.use(logger('dev'));
app.use(require('connect').bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));


//Route Files
var routes = require('./routes/index');
var admin = require('./routes/dashboard/admin');
var tools = require('./routes/dashboard/tools');
var getRoutes = require('./routes/dashboard/get');



// view engine setup
app.engine('html',swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


//Routes
app.use('/dashboard/view',getRoutes);
app.use('/dashboard', admin);
app.use('/', routes);










swig.setDefaults({cache:false});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.listen(80);
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

