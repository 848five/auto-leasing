var express = require('express');
var md5 = require('MD5');
var router = express.Router();
var user;
var specialsList;
var mongodb = require('mongodb');

router.get('/', function(req,res) {
		 var activeSession = req.cookies._a;
		 if (activeSession) {
		 	console.log(activeSession);
		 	res.redirect('/admin/tools');
		 } else {
         	res.render('admin',"");
		 }
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
								loadSpecials();
		                		res.render('admin',{auth: user,specials:specialsList});
		                		res.cookie('_a', md5(Date()+'87155'), { expires: 0, httpOnly: true });
							}

					db.close();
				});
			});
		});
	}
	console.log('main menu');
});


module.exports = router;
