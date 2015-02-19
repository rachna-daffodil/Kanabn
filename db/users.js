var express=require('express');
var db=require('./db.js');
var api=require('./users.js').api;


module.exports.api={
login:function(arg,callback){	
        try{
		    if(!arg.email)
               throw "email is required";
            else if(!arg.password)
               throw "enter the password";
            else{			   
    	          db.user.find({email:arg.email,password:arg.password},function(err,res){
	              if(err){
		          console.log(err);
			      callback(err,null);
		          } else {
				  console.log("hello");
		         callback(null,res);
		           } 
               	})
              }
		} catch(error)
          { 
		     error.prototype=Error.prototype;
			 callback(error,null);
		  }	
				},
	register:function(arg,callback){	
	    try{
		    if(!arg.email)
               throw "email is required";
			else if(!arg.name)
               throw "enter the name";
            else if(!arg.password)
               throw "enter the password";
            else{
                  db.user.create(arg,function(err,res){
		          if(err){
		          console.log(err);
			      callback(err,null);
		          } else {
					callback(null,res);
		           }
	              })
              }
		} catch(error)
          { 
		     error.prototype=Error.prototype;
			 callback(error,null);
		  }	
	},
	getusers:function(arg,callback){
	    db.user.find({},function(err,res){
		if(err){
			callback(err,null);
		  } else {
		    callback(null,res);
		  }  
		})
	},
	verification:function(task,updation,callback){
	    db.user.update(task,updation,function(err,res){
		  console.log(updation);
		  if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		    callback(null,res);
		  }
		})
	},
}