var express = require('express');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();
var router = express.Router();
var api=require('../db/projects.js').api;


router.get('/fetch/:username', function(req, res, next) {
  api.gproject({"email":req.params.username},function(err,response){
    if(err) { 
	   res.status(400).send(err);
     } else {
	   console.log(req.body);
	   res.send(response);
	 }
  });
});
router.post('/create', function(req, res, next) {
  console.log("req is ",JSON.stringify(req.body));
  api.pproject(req.body,function(err,response){
     if(err) { 
	     res.status(400).send(err);
     } else {
	     res.send(response);
	 }
  });
});
router.put('/update/:nam', function(req, res, next) {
  console.log(req.body.projectName);
  api.save({"_id":req.params.nam},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
	    console.log(response);
	  	res.sendStatus("result"+response);
    }
  });
});
router.put('/updateemail/:nam', function(req, res, next) {
  console.log("ggusjhcsu"+JSON.stringify(req.body));
  api.saveemail({"_id":req.params.nam},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      console.log(response);
      res.sendStatus("result"+response);
    }
  });
});
module.exports = router;