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
 
  if (!error && response.statusCode == 200) {
     var data = JSON.parse(body);
  
     for (make in data.makes) {
      var makes = [];
      var models = [];
      makes.push(data.makes[make].name);
      models.push(data.makes[make].models);
      console.log(data.makes[make].name);
      var raw = data.makes[make];
       db.collection('vehicles',function(err,collection) {
        collection.save({make:makes,models:models,raw:raw},function(err, result) {
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


   

  }
});

});


res.send('done');
console.log('dumpm finished');     
});



module.exports = router;