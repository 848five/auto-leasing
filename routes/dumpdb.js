var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

var status ="";
router.get('/', function(req,res,next) {
var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});
console.log('attempting to dump db');
db.open(function(err) {
console.log('db open');
//dump all new makes
var request = require('request');
request('https://api.edmunds.com/api/vehicle/v2/makes?state=new&fmt=json&api_key=vve9rc8s95q77kat7cc9h54m', function (error, response, body) {
 
  console.log(body + '<---');
  if (!error && response.statusCode == 200) {
     var data = JSON.parse(body);
    console.log(data.makes.models);
    db.collection('vehicles.makes',function(err,collection) {
    collection.save({makes:data.makes},function(err, result) {
    		if (!err) {
    			status += "||| all makes dumped ";
          console.log('makes dumped...');
    		} else {
    			status += "||| makes NOT dumped, error! ";
          console.log('error');
    		}
        db.close();
    	});
	});
  }
});

});


res.send('done');
console.log('dumpm finished');     
});



module.exports = router;