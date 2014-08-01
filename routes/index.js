var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var dbURL = "bliss";
	var collections = "specials";
	var db = require("mongojs").connect(dbURL,collections);
	var specials = db.specials.find();
  res.render('index', specials);
});

module.exports = router;
