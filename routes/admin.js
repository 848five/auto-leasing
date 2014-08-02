var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
router.get('/', function(req,res) {
         res.render('admin',"");
});


router.post('/', function(req,res) {
	var user = req.body.user;
	var pass = req.body.password;
	var error = "";

	if (user == "" || pass == "") {
		error = "enter a username and password.";
		res.render('admin',{msg: error});
	} else {
		db.open(function(err) {
			db.collection('admin',function(err,collection) {
				collection.find({user:user,password:pass}).toArray(function(err,user) {

							if (user.length == 0) {
								error = "invalid login, try again.";
								res.render('admin',{msg: error});
							} else {
								console.log(user);
		                		res.render('admin',{auth: user});
		                		console.log('logged! wooohooo!');
							}

					db.close();
				});
			});
		});
	}
 

});
module.exports = router;
