var express = require('express');
var md5 = require('MD5'); 
var mongodb = require('mongodb');
//var formidable = require('formidable');
var util = require("util"); 
var fs = require("fs"); 
var router = express.Router();


var db = new mongodb.Db('bliss', new mongodb.Server('127.0.0.1', 27017), {safe:true});




//
//
//UPDATE PHOTOS ROUTES
router.delete('/photo/:category/:postid/',function(req,res,next) {
    var hash = new Date();
    var activeSession = req.cookies._a;
    var category = req.params.category;
    var postId = req.params.postid;

            var photo = req.body.photo;
          
            console.log("id: " + updateId + " , photo: " + photo);
          return;
            
          

     if (activeSession == md5(hash.getDay()+'87155')) {
        if (category) {
            console.log('posted');
        
               
                //save to db
                db.open(function(err) {
                    if (!err) {
                        db.collection(category,function(err,collection) {
                            if (photo != "" || photo != null) {
                                collection.update({_id:OnjectId(postId)},{$pull: {"photos": {"items":photo}}});
                                    console.log('photo removed. - >' + photo);
                                    db.close();
                            } else {
                                console.log('empty field, record not created');
                            }
                            photo = "";
                            res.render('admin',{msg: "photo removed"});  

                        });
                    } else {
                        res.render('admin',{msg: err});
                    }
                });
        }
     } else {
        if (category) {
                console.log('no access');
                var err = new Error('Not Found');
                err.status = 404;
                next(err);
        } else {
            res.render('admin',"");
        }
    }
});


module.exports = router;
