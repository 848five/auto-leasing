var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin-panel', function(req, res) {
  res.render('admin-panel',"");
});

module.exports = router;
