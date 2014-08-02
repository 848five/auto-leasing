var express = require('express');
var md5 = require('MD5');
var router = express.Router();
var user;
var mongodb = require('mongodb');
var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
router.get('/', function(req,res) {
         res.render('admin',"");
});

function loadSpecials() {
			db.collection('specials',function(err,collection) {
				var test = collection.find({}).toArray(function(err,list) {
							console.log(list);

					db.close();
				});
				console.log('test' + test);
				
			});
}


router.post('/create/:collection?',function(req,res) {
	switch(req.params.collection) {
    case 'specials':
    	var year = req.body.year;
        db.open(function(err) {
        	if (!err) {
				db.collection('specials',function(err,collection) {
					collection.save({year:year} , function(err, result) {
			        	console.log('special saved');
			        	db.close();
     				});
     				loadSpecials();
					res.render('admin',{auth: user,msg: 'record added.'});	
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
		                		res.render('admin',{auth: user});
		                		//res.cookie('', 'yes', { expires: 0, httpOnly: true });
							}

					db.close();
				});
			});
		});
	}
});


module.exports = router;
