var express = require('express');
var md5 = require('MD5');
var router = express.Router();
var user;
var specialsList;
var mongodb = require('mongodb');


router.get('/dashboard/:category?/:year?/:make?/:model?', function(req,res) {
	if (model) {
		res.send('model level');
	} else if (make) {
		res.send('make level');
	} else if (year) {
		res.send('year level');
	} else if (category) {
		res.send('category');
	}
});


router.get('/', function(req,res) {
		 var hash = new Date();
		 var activeSession = req.cookies._a;
		 if (activeSession == md5(hash.getDay()+'87155')) {
		 	console.log(activeSession);
		 	res.render('tools',{auth: user,specials:specialsList});
		 } else {
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
		var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
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
		                		res.render('tools',{auth: user,specials:specialsList});
							}

					db.close();
				});
			});
		});
	}
});


module.exports = router;
