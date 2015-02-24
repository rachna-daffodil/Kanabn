var express = require('express');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();
var router = express.Router();
var api=require('../db/tasks.js').api;

router.post('/create', function(req, res, next) {
  api.create(req.body,function(err,response){
     if(err) { 
	   res.status(400).send(err);
     } else {
	   res.send(response);
	   }
  });
});
router.get('/fetch/:pname', function(req, res, next) {
  //res.setHeader("Content-Type","application/json");
  api.read({"project_id":req.params.pname},function(err,response){
     if(err) { 
	  res.status(400).send(err);
     } else {
	   res.send(response);
	   }
  });
});
router.put('/update/:change/:change1', function(req, res, next) {
  //res.setHeader("Content-Type","application/json");
  console.log(req.params.change+req.params.change1);
  api.update({"project_id":req.params.change, "taskname":req.params.change1},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      res.send("result"+response);
	   console.log(response);
    }
  });
});
router.delete('/delete', function(req, res, next) {
  api.deletea(req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      api.read();
    }
  });
});


module.exports = router;