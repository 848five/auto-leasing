var express = require('express');

var router = express.Router();


router.get('/', function(req, res) {
		res.render('tools',"");
		console.log(req.session.name);
});

module.exports = router;
