var express = require('express');
var md5 = require('MD5'); 
var mongodb = require('mongodb');
//var formidable = require('formidable');
var util = require("util"); 
var fs = require("fs"); 
var router = express.Router();


var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});


//
//
//POST ROUTES
router.post('/:category',function(req,res,next) {
	var hash = new Date();
    var activeSession = req.cookies._a;
    var category = req.params.category;

  	    	var year = req.body.year;
		    var make = req.body.make;
		    var model = req.body.model;
		    var package = req.body.package;
		    var downPayment = req.body.downPayment;
		    var monthlyPayment = req.body.monthlyPayment;
		    var desc = req.body.desc;

            var files = [];
            var fileKeys = Object.keys(req.files);

            fileKeys.forEach(function(key) {
                console.log(key);
                console.log('-----');
                console.log(req.files[key]);
                console.log('-----');
            });
            return;

		    var photos = files;

     if (activeSession == md5(hash.getDay()+'87155')) {
     	if (category) {
     		console.log('posted');
     			//upload photo
     			/*var form = new formidable.IncomingForm(),
			    photos = [],
			    fields = [];
			    form.uploadDir = '/root/auto-leasing/static/uploads';
			    form.on('field', function(field, value) {
			        fields.push([field, value]);
			    })
			    form.on('file', function(field, file) {
			        console.log(file.name);
			        photos.push([field, file]);
			    })
			    form.on('end', function() {
			        console.log('done');
			       
			    });
			    form.parse(req);
*/
				if (req.files) { 
					//console.log(util.inspect(req.files));
					if (req.files.files.size === 0) {
					            return next(new Error("Hey, first would you select a file?"));
					}
					
				} 
			    //save to db
			    db.open(function(err) {
		        	if (!err) {
						db.collection(category,function(err,collection) {
							if (year != "" || year != null) {
								collection.save({year:year,make:make,model:model,package:package,downPayment:downPayment,monthlyPayment:monthlyPayment,photos:photos} , function(err, result) {
						        	console.log('special saved');
						        	db.close();
			     				});
							} else {
								console.log('empty field, record not created');
							}
		     				year = "";
							res.render('admin',{msg: "record added"});	

						});
					} else {
						res.render('admin',{msg: err});
					}
				});
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


//
//
//GET ROUTES
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
                                    res.render('specials',{list:categoryList,admin:"1"});
                                }
                                db.close();
                                });             
                            } else {
                                collection.find({year:year,make:make,model:model},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.render('specials',{list:categoryList,admin:"1"});
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
                                    res.render('specials',{list:categoryList,admin:"1"});
                                }
                                db.close();
                                });             
                            } else {
                                collection.find({year:year,make:make},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.render('specials',{list:categoryList,admin:"1"});
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
	                                res.render('specials',{list:categoryList,admin:"1"});
	                            }
	                            db.close();
	                        	});
	                    } else {
	                           collection.find({year:year},{sort:{$natural:-1}}).toArray(function(err,list) {
	                            categoryList = list;
	                            if (categoryList.length == 0 || category == "admin") {
	                                res.send('nothing found');
	                            } else {
	                                res.render('specials',{list:categoryList,admin:"1"});
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
                            	
                                res.render('specials',{list:categoryList,admin:"1"});
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
