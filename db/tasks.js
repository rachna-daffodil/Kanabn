var express=require('express');
var db=require('./db.js');
var api=require('./tasks.js').api;
var emailvar=require('../util/mailutil.js').email;

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
		if(updation.comment){
			db.tasks.update(task,{
				$push : {
					comments : {
						"email" : updation.email,
						"comment" : updation.comment,
						"on_date" : Date() 
					}
				}
			},function(err,res){
				if(err){
					console.log(err);
					callback(err,null);
				} else {
					console.log(res);
					callback(null,res);
				}
			})
		} else {
	    db.tasks.update(task,updation,function(err,res){
		  console.log(updation);
		  if(err){
		    console.log(err);
			callback(err,null);
		  } else {
		  	if(updation.status1 == "complete"){
		  		var text1 = "Hello <br> Welcome in KanBan.<br> Your task is completed";
        				 	var options={to:updation.email, html:text1, subject:"Welcome in KanBan"};
                            emailvar.sendemail(options,function(err,result){
				           	console.log("email verify");
							callback(null,res);
						})
		  	}
		    else{callback(null,res);}
		  }
		})
	}
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
