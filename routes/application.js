var express = require('express');
var md5 = require('MD5'); 
var mongodb = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var util = require("util"); 
var fs = require("fs"); 
var nodemailer = require('nodemailer');
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


						// create reusable transporter object using SMTP transport
						var transporter = nodemailer.createTransport();

						// NB! No need to recreate the transporter object. You can use
						// the same transporter object for all e-mails

						// setup e-mail data with unicode symbols
						var mailOptions = {
						    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
						    to: 'aramik@whalerockindustries.com, a.mik@me.com', // list of receivers
						    subject: 'Hello ✔', // Subject line
						    text: 'Hello world ✔', // plaintext body
						    html: '<b>Hello world ✔</b>' // html body
						};

						// send mail with defined transport object
						transporter.sendMail(mailOptions, function(error, info){
						    if(error){
						        console.log(error);
						    }else{
						        console.log('Message sent: ' + info.response);
						    }
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
