var express = require('express');
var router = express.Router();


router.post('/task', function(req, res, next) {
  api.create(req.body,function(err,response){
     if(err) { 
	   res.status(400).send(err);
     } else {
	   res.send(response);
	 }
  });
});
router.get('/task/:pname/:ename', function(req, res, next) {
  res.setHeader("Content-Type","application/json");
  api.read({"proname":req.params.pname,"email":req.params.ename},function(err,response){
     if(err) { 
	  res.status(400).send(err);
     } else {
	   res.send(response);
	 }
  });
});
router.put('/task/:change/:change2/:change3', function(req, res, next) {
  res.setHeader("Content-Type","application/json");
  console.log(req.params.change+req.params.change2+req.params.change3);
  api.update({"title":req.params.change,"email":req.params.change2,"proname":req.params.change3},req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      //api.read();
	  console.log(response);
    }
  });
});
router.delete('/task', function(req, res, next) {
  api.deletea(req.body,function(err,response){
    if(err){
      res.status(400).send(err);
    } else {
      api.read();
    }
  });
});


module.exports = router;