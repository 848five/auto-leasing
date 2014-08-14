var mongodb = require('mongodb');
var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});

db.open(function(err) {

//dump all new makes
var request = require('request');
request('https://api.edmunds.com/api/vehicle/v2/makes?state=new&fmt=json&api_key=vve9rc8s95q77kat7cc9h54m', function (error, response, body) {
  if (!error && response.statusCode == 200) {
     var data = JSON.parse(body);
  	
  	for (make in data.makes) {
  		console.log(make);
  	}

  return;
    db.collection('vehicles.makes',function(err,collection) {
    collection.save({makes:data.makes},function(err, result) {
    		if (!err) {
    			console.log('all makes saved!');
    		} else {
    			console.log('error -> makes');
    		}
    	});
	});
  }
});

});
db.close();

