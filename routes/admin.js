var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
router.get('/', function(req,res) {
         res.render('admin',{items: items});
});


router.post('/', function(req,res) {
	console.log(req);
db.open(function(err) {
	db.collection('admin',function(err,collection) {
		collection.find().toArray(function(err,items) {
                	res.render('admin',{items: items});
			console.log(items);
			db.close();
		});
	});
});
});
module.exports = router;
