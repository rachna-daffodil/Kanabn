var express=require('express');
var db=require('./db.js');
var api=require('./projects.js').api;

module.exports.api={
gproject:function(arg,callback){
	    db.user1.find(arg,function(err,res){
		if(err){
			callback(err,null);
		  } else {
		    callback(null,res);
		  }  
		})
	},
	pproject:function(arg,callback){
	   try{
		    if(!arg.name)
               throw "name is required";
			else{
	             db.user1.create(arg,function(err,res){
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
	save:function(task,updation,callback){
	    db.user1.update(task,updation,function(err,res){
		  console.log(task.name);
		  if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		    db.user2.update({"proname":task.name},{"proname":updation.name},{multi:true},function(err,res1){
		    console.log(updation.name);
		    if(err){
		      console.log(err);
			  callback(err,null);
		     } else {
			   console.log("helloooo"+res1);
		       callback(null,res);
		     }
		    })
			//callback(null,res);
			}
		})
	},
}