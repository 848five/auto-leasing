var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var dbURL = "speacials";
	var collections = "cars";
	var db = require("mongojs").connect(dbURL,collections);

  res.render('index', db.specials.find());
});

module.exports = router;
