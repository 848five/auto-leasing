var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();



var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});


/* GET home page. */
router.get('/:category?/:year?/:make?/:model?', function(req,res,next) {

    var category = req.params.category;
    var year = req.params.year;
    var make = req.params.make;
    var model = req.params.model;
 
            if (model) {
                db.open(function(err) {
                    db.collection(category,function(err,collection) {
                           if (year == "all") {
                                collection.find({make:make,model:model},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.render('specials',{list:categoryList});
                                }
                                db.close();
                                });             
                            } else {
                                collection.find({year:year,make:make,model:model},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.render('specials',{list:categoryList});
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
                                    res.render('specials',{list:categoryList});
                                }
                                db.close();
                                });             
                            } else {
                                collection.find({year:year,make:make},{sort:{$natural:-1}}).toArray(function(err,list) {
                                categoryList = list;
                                if (categoryList.length == 0 || category == "admin") {
                                    res.send('nothing found');
                                } else {
                                    res.render('specials',{list:categoryList});
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
	                                res.render('specials',{list:categoryList});
	                            }
	                            db.close();
	                        	});
	                    } else {
	                           collection.find({year:year},{sort:{$natural:-1}}).toArray(function(err,list) {
	                            categoryList = list;
	                            if (categoryList.length == 0 || category == "admin") {
	                                res.send('nothing found');
	                            } else {
	                                res.render('specials',{list:categoryList});
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
                                res.render('specials',{list:categoryList});
                            }
                            db.close();
                        });             
                    });
                });
            } else {


                var request = require('request');
                var url = "https://api.edmunds.com/api/vehicle/v2/makes?state=new&fmt=json&api_key=vve9rc8s95q77kat7cc9h54m"

                request({
                    url: url,
                    json: true
                }, function (error, response, body) {

                    if (!error && response.statusCode === 200) {
                         res.render('index',{makes:body});
                    }
                });
                  
                }


        
});



module.exports = router;
