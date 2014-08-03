var express = require('express');
var md5 = require('MD5');
var router = express.Router();


router.get('/', function(req, res) {
		 var hash = new Date();
		 var activeSession = req.cookies._a;
		 if (activeSession == md5(hash.getDay()+'87155')) {
		 	console.log(activeSession);
		 	res.send('hi');
		 } else {
         	res.render('admin',"");
		 }
});

module.exports = router;
