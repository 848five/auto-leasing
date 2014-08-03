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


//Route Files
var routes = require('./routes/index');

var admin = require('./routes/dashboard/admin');
var tools = require('./routes/dashboard/tools');
var createSpecials = require('./routes/dashboard/createSpecials');

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
app.get('/dashboard/:category?/:year?/:make?/:model?', function(req,res) {
     var hash = new Date();
     var activeSession = req.cookies._a;
     if (activeSession == md5(hash.getDay()+'87155')) {
            var category = req.params.category;
            var year = req.params.year;
            var make = req.params.make;
            var model = req.params.model;

            if (model) {
                var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
                db.open(function(err) {
                    db.collection(category,function(err,collection) {
                           if (year == "all") {
                                collection.find({make:make,model:model},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.send(categoryList);
                                }
                                db.close();
                                });             
                            } else {
                                collection.find({year:year,make:make,model:model},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.send(categoryList);
                                }
                                db.close();
                                }); 
                            }
                    });
                });
            } else if (make) {
                var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
                db.open(function(err) {
                    db.collection(category,function(err,collection) {
                           if (year == "all") {
                                collection.find({make:make},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.send(categoryList);
                                }
                                db.close();
                                });             
                            } else {
                                collection.find({year:year,make:make},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.send(categoryList);
                                }
                                db.close();
                                }); 
                            }
                    });
                });
            } else if (year) {
                var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
                db.open(function(err) {
                    db.collection(category,function(err,collection) {
                           collection.find({year:year},{sort:{$natural:-1}}).toArray(function(err,list) {
                            categoryList = list;
                            if (categoryList.length == 0 || category == "admin") {
                                res.send('nothing found');
                            } else {
                                res.send(categoryList);
                            }
                            db.close();
                        });             
                    });
                });
            } else if (category) {
                var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
                db.open(function(err) {
                    db.collection(category,function(err,collection) {
                           collection.find({},{sort:{$natural:-1}}).toArray(function(err,list) {
                            categoryList = list;
                            if (categoryList.length == 0 || category == "admin") {
                                res.send('nothing found');
                            } else {
                                res.send(categoryList);
                            }
                            db.close();
                        });             
                    });
                });
            } 
        } else {
            res.send('not authorized');
        }
});

app.use('/dashboard', admin);

app.use('/', routes);






app.use('/dashboard/specials/',createSpecials);




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

