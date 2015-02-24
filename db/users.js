var express=require('express');
var db=require('./db.js');
var api=require('./users.js').api;
var token=require('../util/tokenutil.js').password;
var emailvar=require('../util/mailutil.js').email;

module.exports.api={
	login:function(arg,callback){	
        try{
		    if(!arg.email)
               throw "email is required";
            else if(!arg.password)
               throw "enter the password";
            else{			   
    	        db.user.find({email:arg.email,password:arg.password},{password : 0},function(err,res){
	            	if(err){
		        		console.log(err);
			    		callback(err,null);
		        	} else {
						console.log("hello");
		        		callback(null,res);
		        	} 
               	})
            }
		} catch(error) { 
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
            		console.log("in register function "+JSON.stringify(arg));
            		token.generatetokan(function(err,result)
        			{
						console.log("login 1");
						arg.verify_token=result;
                  		db.user.create(arg,function(err,res){
		          		if(err){
		          			console.log(err);
			      			callback(err,null);
		          		} else {
		          			var text1 = "Hello " + arg.name + "<br> Welcome in KanBan.<br> Please click on below link for verify your account:<br> http://192.168.100.199:5555/#/user/verify/" +res.verify_token;
        				 	var options={to:arg.email, html:text1, subject:"Welcome in KanBan"};
                            emailvar.sendemail(options,function(err,result){
				           	console.log("email verify");
							callback(null,res);
						})
		           		}
	              		})
             		 })
             	}
			} catch(error)
          	{ 
		     error.prototype=Error.prototype;
			 callback(error,null);
		  	}	
	},
	getusers:function(arg,callback){
		var teamarray = arg.split(',');
		console.log(teamarray);
	    db.user.find({
       		'email': {
           		$nin: teamarray
       		}
   		},{password : 0},function(err,res){
			if(err){
				callback(err,null);
		  	} else {
		    	callback(null,res);
		  	}  
		})
	},
	verification:function(task,updation,callback){
		console.log("in verification"+task+'/'+updation);
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
	resetpass:function(opts,change,callback)
  	{ 
  		var test=opts.email;
  		token.changepassword(function(data,result){
  			console.log("resetpass");
        	opts.password = result;
   			db.user.update({"email":opts.email},{password:opts.password},function(err,result1) {
      			if(err) {
          			console.log(err);
          			callback(err,null);
        		} else {
            		var html="hello user <br> your password is "+result; 
            		var form={to:opts.email,html:html};
            		emailvar.sendemail(form,function(err,result2){
            			console.log("password change ");
            		});
        			console.log("task updated");
        			callback(null,result1);
       			}
    		});
    	});
  	},
  	invite:function(arg1,arg2,callback){	
	   	console.log("in invite function "+JSON.stringify(arg2));
       	db.user.find({"email":arg1},function(err,res){
		    if(err){
		       	console.log(err);
		      	callback(err,null);
		    } else {
		    	if(res.length == 0){
		    		console.log("if successful",res);
		    		var text1 = "Hello <br> Welcome in KanBan.<br> Please click on below link to create your account in Kanban:<br> http://192.168.100.199:5555/#/user/invite/" +arg2;
        			var options={to:arg1, html:text1, subject:"Welcome in KanBan"};
                    emailvar.sendemail(options,function(err,result){
			        	console.log("email verify");
						callback(null,res);
					})
		       	} else {console.log("if fail",res);}
	       	}
        })
    },
    getprofile:function(arg,callback){
		db.user.find(arg,function(err,res){
	       	if(err){
		   		console.log(err);
		   		callback(err,null);
		   	} else {
				console.log("hello");
		   		callback(null,res);
		   	} 
        })
    }
}