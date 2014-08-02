var express = require('express');
var md5 = require('MD5');
var router = express.Router();
var user;
var specialsList;
var mongodb = require('mongodb');

router.get('/', function(req,res) {
         res.render('admin',"");
});

function loadSpecials() {
	var sdb = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
	sdb.open(function(err) {
			sdb.collection('specials',function(err,collection) {
				   collection.find({},{sort:{$natural:-1}}).toArray(function(err,list) {
					specialsList = list;
					sdb.close();
				});				
			});
		});
}


router.post('/',function(req,res) {
	switch(req.params.collection) {
    case 'specials':
    	var year = req.body.year;
    	var make = req.body.make;
    	var model = req.body.model;
    	var downPayment = req.body.downPayment;
    	var monthlyPayment = req.body.monthlyPayment;
    	var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
        db.open(function(err) {
        	if (!err) {
				db.collection('specials',function(err,collection) {
					if (year != "") {
						collection.save({year:year,make:make,model:model,downPayment:downPayment,monthlyPayment:monthlyPayment} , function(err, result) {
				        	console.log('special saved');
				        	db.close();
	     				});
					}
     				loadSpecials();
     				year = "";
					res.render('admin',{auth: user,msg: 'record added.',specials:specialsList});	

				});
			} else {
				res.render('admin',{msg: err});
			}
		});
        break;
    default:
        res.send('default');
}
});




module.exports = router;