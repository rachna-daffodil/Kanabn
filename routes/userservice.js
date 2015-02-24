var express = require('express');
var router = express.Router();
var api = require('../db/users.js').api;


router.get('/invite/:email/:id', function(req, res, next) {
  console.log("in invite function",req.params.email);
    api.invite(req.params.email,req.params.id,function(err,response){
    if(err){
    res.status(400).send(err);
  } else {
    console.log(response);
      res.send(response);
  }
  }); 
});
router.post('/signin', function(req, res, next) {
	console.log("in signup function",req.body);
  	api.login(req.body,function(err,response){
    if(err){
	  res.status(400).send(err);
	} else {
		console.log(response);
	  	res.send(response);
	}
  }); 
});
router.post('/signup', function(req, res, next) {
	
	console.log("in signup function",req.body);
  api.register(req.body,function(err,response){
    if(err){
	  res.status(400).send(err);
	} else {
	    res.send(response);
	}
  });
});
router.put('/verify/:change', function(req, res, next) {
  // res.setHeader("Content-Type","application/json");
  console.log(req.params.change+'/'+req.body);
  api.verification({"verify_token":req.params.change},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
    	if(response == 0){
    		res.status(200).send("You verification is failed");
    	} else {
    		res.status(200).send("You are successfully verified");
    	}
    }
  });
});
router.put('/resetpassword/:change', function(req, res, next) {
  //res.setHeader("Content-Type","application/json");
  console.log(req.params.change);
  api.resetpass({"email":req.params.change},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
		res.status(200).send("password is changed");
	  	console.log(response);
    }
  });
});

router.get('/signup/:team',function(req,res,next){
	console.log(req.params.team);
	api.getusers(req.params.team,function(err,response){
	if(err) { 
	   res.status(400).send(err);
     } else {
	   console.log(response);
	   res.send(response);
	 }
  });
});
router.get('/signin/:email',function(req,res,next){
  console.log(req.params.team);
  api.getprofile({"email": req.params.email},function(err,response){
  if(err) { 
     res.status(400).send(err);
     } else {
     console.log(response);
     res.send(response);
   }
  });
});
router.put('/signup/:change', function(req, res, next) {
  //res.setHeader("Content-Type","application/json");
  console.log(req.params.change);
  api.verification({"email":req.params.change},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      res.send("result"+response);
	  console.log(response);
    }
  });
});

module.exports = router;
