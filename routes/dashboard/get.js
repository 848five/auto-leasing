var express = require('express');
var md5 = require('MD5'); 
var mongodb = require('mongodb');
var formidable = require('formidable');
var router = express.Router();

var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});

router.post('/:category',function(req,res,next) {
	var hash = new Date();
    var activeSession = req.cookies._a;
    var category = req.params.category;

     if (activeSession == md5(hash.getDay()+'87155')) {
     	if (category) {
     		console.log('posted');
     		 var form = new formidable.IncomingForm(),
			    files = [],
			    fields = [];
			    form.uploadDir = '/root/auto-leasing/static/uploads';
			    form.on('field', function(field, value) {
			        fields.push([field, value]);
			    })
			    form.on('file', function(field, file) {
			        console.log(file.name);
			        files.push([field, file]);
			    })
			    form.on('end', function() {
			        console.log('done');
			        res.redirect('/forms');
			    });
			    form.parse(req);
     	}
 	 } else {
        if (category) {
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
        } else {
            res.render('admin',"");
        }
    }
});

router.get('/:category?/:year?/:make?/:model?', function(req,res,next) {
    var hash = new Date();
    var activeSession = req.cookies._a;
    var category = req.params.category;
    var year = req.params.year;
    var make = req.params.make;
    var model = req.params.model;
     if (activeSession == md5(hash.getDay()+'87155')) {

            if (model) {
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
                db.open(function(err) {
                    db.collection(category,function(err,collection) {
	                    if (year == "all") {
	                    		collection.find({},{sort:{$natural:-1}}).toArray(function(err,list) {
	                            categoryList = list;
	                            if (categoryList.length == 0 || category == "admin") {
	                                res.send('nothing found');
	                            } else {
	                                res.send(categoryList);
	                            }
	                            db.close();
	                        	});
	                    } else {
	                           collection.find({year:year},{sort:{$natural:-1}}).toArray(function(err,list) {
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
            } else if (category) {
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
            if (category || year || make || model) {
                    var err = new Error('Not Found');
                    err.status = 404;
                    next(err);
            } else {
                res.render('admin',"");
            }
        }
});


module.exports = router;
