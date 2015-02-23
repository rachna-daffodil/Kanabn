var express = require('express');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();
var router = express.Router();
var api=require('../db/projects.js').api;


router.get('/fetch/:username', function(req, res, next) {
  //res.setHeader("Content-Type","application/json");
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
  //res.setHeader("Content-Type","application/json");
  console.log(req.body.projectName);
  api.save({"projectName":req.params.nam},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
	    console.log(response);
	  	res.sendStatus("result"+response);
    }
  });
});
router.put('/updateemail/:nam/:array', function(req, res, next) {
  //res.setHeader("Content-Type","application/json");
  console.log("ggusjhcsu"+JSON.stringify(req.params.array));
  api.saveemail({"projectName":req.params.nam},req.params.array,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      console.log(response);
      res.sendStatus("result"+response);
    }
  });
});
module.exports = router;