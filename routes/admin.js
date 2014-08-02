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

	if (user == "" || pass = "") {
		error = "Invalid login, try again.";
		res.render('admin',{msg: error});
	} else {
		db.open(function(err) {
			db.collection('admin',function(err,collection) {
				collection.find().toArray(function(err,items) {
		                	res.render('admin',{items: items});
					console.log('post');
					db.close();
				});
			});
		});
	}
 

});
module.exports = router;
