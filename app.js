var express = require('express');
var path = require('path');
var swig = require('swig');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('mongoskin');


var mongodb = require('mongodb');
var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});


//Route Files
var routes = require('./routes/index');
var admin = require('./routes/admin');
var create = require('./routes/create');

var app = express();

// view engine setup
app.engine('html',swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use( require('express-force-domain')('http://www.blissautoleasing.com') );

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));



//Routes
app.use('/', routes);
app.use('/admin-panel', admin);




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

