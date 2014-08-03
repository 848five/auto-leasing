var express = require('express');
var md5 = require('MD5');
var router = express.Router();


router.get('/', function(req, res) {
		res.render('tools',"");
});

module.exports = router;
