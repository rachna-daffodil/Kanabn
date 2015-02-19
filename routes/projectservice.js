var express = require('express');
var router = express.Router();


router.get('/project/:username', function(req, res, next) {
  res.setHeader("Content-Type","application/json");
  api.gproject({"email":req.params.username},function(err,response){
    if(err) { 
	   res.status(400).send(err);
     } else {
	   console.log(req.body);
	   res.send(response);
	 }
  });
});
router.post('/project', function(req, res, next) {
  api.pproject(req.body,function(err,response){
     if(err) { 
	   res.status(400).send(err);
     } else {
	   res.send(response);
	 }
  });
});
router.put('/project/:nam', function(req, res, next) {
  res.setHeader("Content-Type","application/json");
  console.log(req.body.name);
  api.save({"name":req.params.nam},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
	    console.log(response);
	  	res.sendStatus("result"+response);
    }
  });
});

module.exports = router;