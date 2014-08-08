var express = require('express');
var md5 = require('MD5');
var router = express.Router();
var user;
var mongodb = require('mongodb');

var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});



router.get('/', function(req,res) {
		 var hash = new Date();
		 var activeSession = req.cookies._a;
		 if (activeSession == md5(hash.getDay()+'87155')) {
		 	console.log(activeSession);

		 	db.open(function(err) {
			db.collection('applications',function(err,collection) {
				collection.find({}).toArray(function(err,apps) {
						res.redirect('tools',{apps:apps});
					db.close();
				});
			});
		});


		 
		 } else {
		 	console.log(activeSession);
         	res.render('admin',"");
		 }
});


router.post('/', function(req,res) {
	user = req.body.user;
	var pass = req.body.password;
	var error = "";

	if (user == "" || pass == "") {
		error = "enter a username and password.";
		res.render('admin',{msg: error});
	} else {
		db.open(function(err) {
			db.collection('admin',function(err,collection) {
				collection.find({user:user,password:md5(pass)}).toArray(function(err,user) {
					console.log(md5(pass));
							if (user.length == 0) {
								error = "invalid login, try again.";
								res.render('admin',{msg: error});
							} else {
								var hash = new Date();
		                		res.cookie('_a', md5(hash.getDay()+'87155'), { expires: 0, httpOnly: true });
		                		res.render('tools',"");
							}

					db.close();
				});
			});
		});
	}
});


module.exports = router;
