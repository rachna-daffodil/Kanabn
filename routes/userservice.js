var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/user/signin', function(req, res, next) {
  api.login(req.body,function(err,response){
    if(err){
	  res.status(400).send(err);
	} else {
	  res.send(response);
	}
  }); 
});
router.put('/user/signin/:change', function(req, res, next) {
  res.setHeader("Content-Type","application/json");
  console.log(req.params.change);
  api.verification({"email":req.params.change},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
				transporter.sendMail({
					from: "<rachna.kadian@daffodilsw.com>", // sender address
					to: " <rachnakadian8@gmail.com>", // comma separated list of receivers
					subject: "new password", // Subject line
					text:  req.body.password,
					
					}, function(error, response){
							if(error){
							console.log(error);
						}else{
                          console.log("Message sent: " +  req.body.password);
						}
                   });
	  console.log(response);
    }
  });
});
router.post('/user/signup', function(req, res, next) {
  api.register(req.body,function(err,response){
    if(err){
	  res.status(400).send(err);
	} else {
	  transporter.sendMail({
					from: "<rachna.kadian@daffodilsw.com>", // sender address
					to: " <rachnakadian8@gmail.com>", // comma separated list of receivers
					subject: "Verify your email", // Subject line
					text: "hi http://192.168.100.199:4000/#/verify/"+response.email,
					
					}, function(error, response){
							if(error){
							console.log(error);
						}else{
                          console.log("Message sent: " + response.message);
						}
                   });
	  res.send(response);
	}
  });
});
router.get('/user/signup',function(req,res,next){
	res.setHeader("Content-Type","application/json");
	api.getusers({},function(err,response){
	if(err) { 
	   res.status(400).send(err);
     } else {
	   console.log(response);
	   res.send(response);
	 }
  });
});
router.put('/user/signup/:change', function(req, res, next) {
  res.setHeader("Content-Type","application/json");
  console.log(req.params.change);
  api.verification({"email":req.params.change},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      //api.read();
	  console.log(response);
    }
  });
});

module.exports = router;
