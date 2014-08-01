var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var dbURL = "specials";
	var collections = "cars";
	var db = require("mongojs").connect(dbURL);

  res.render('index', "");
});

module.exports = router;
