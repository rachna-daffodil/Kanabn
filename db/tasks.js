var express=require('express');
var db=require('./db.js');
var api=require('./tasks.js').api;

module.exports.api={
	create:function(arg,callback){
	    db.tasks.create(arg,function(err,res){
          if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		    callback(null,res);
		  }	
		})
	},
	read:function(arg,callback){
	    db.tasks.find({$query :arg, $orderby:{ sequence:1}},function(err,res){
		   console.log(arg);
	      if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		    callback(null,res);
		  }	 	
	    })
	},
	update:function(task,updation,callback){
	    db.tasks.update(task,updation,function(err,res){
		  console.log(updation);
		  if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		    callback(null,res);
		  }
		})
	},
	deletea:function(arg,callback){	
	   db.tasks.remove(arg,function(err,res){
	      if(err){
		    console.log(err);
			callback(err,null);
		  } else {
	       callback(null,res);
		  }
	   }) 
	}
}
