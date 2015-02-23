var express=require('express');
var db=require('./db.js');
var api=require('./projects.js').api;

module.exports.api={
	gproject:function(arg,callback){
	    db.projects.find(arg,function(err,res){
		if(err){
			callback(err,null);
		  } else {
		    callback(null,res);
		  }  
		})
	},
	pproject:function(arg,callback){
		console.log("in project create function");
	   try{
		    if(!arg.projectName)
               throw "name is required";
			else{
	             db.projects.create(arg,function(err,res){
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
	    db.projects.update(task,updation,function(err,res){
		  console.log(task.projectName);
		  if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		    console.log(res);
			callback(null,res);
			}
		})
	},
	saveemail:function(task,updation,callback){
		console.log("in saveemail");
		var teamarray = updation.split(',');
		console.log("array is ",teamarray);
	    db.projects.update(task,
   			{ $addToSet: { email: {$each : teamarray} } },function(err,res){
		  console.log(task.projectName);
		  if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		    console.log(res);
			callback(null,res);
			}
		})
	},
}