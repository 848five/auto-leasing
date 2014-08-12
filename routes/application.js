var express = require('express');
var md5 = require('MD5'); 
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var util = require("util"); 
var fs = require("fs"); 
var router = express.Router();
var photo;
var photos;




//
//
//POST ROUTES
router.post('/',function(req,res,next) {
			console.log('posting');
			var message = "";

			for (var key in req.body) {
				message += req.body[key] + " : " + key + " \r\n";
			}

			console.log(message);

			var nodemailer = require('nodemailer');
		    var transporter = nodemailer.createTransport();
		    transporter.sendMail({
		        from: 'sales@blissautoleasing.com',
		        to: 'aramik@whalerockindustries.com',
		        subject: 'hello',
		        text: message
		    });

		    return;


  	    	var name = req.body.name;
		    var address = req.body.address;

			    //save to db
			    db.open(function(err) {
		        	if (!err) {
						db.collection('applications',function(err,collection) {
							if (name != "" || name != null) {
								collection.save({name:name,address:address} , function(err, result) {
						        	console.log('special saved');
						        	db.close();
			     				});
							} else {
								console.log('empty field, record not created');
							}
		     				name = "";
							res.send({status:'1'});

						});
					} else {
						res.send({status:'error'});
					}
				});
 	
});


//
//
//GET ROUTES
router.get('/', function(req,res,next) {
   res.render('application',"");
});


module.exports = router;
