var express=require('express');
var db=require('../db/db.js');

var nodemailer = require("nodemailer");
var ejs = require("ejs");
var transporter = nodemailer.createTransport();

var fromEmail = "rachna.kadian@daffodilsw.com";
var sender = "KanBan Notification";

module.exports.email ={

	sendemail: function(options, callback)
      {
        options.subject = options.subject;
        console.log("in sendemail "+JSON.stringify(options)+'/'+fromEmail);
        if(!options || !options.to || !options.html || !options.subject){
          throw new Error("Mandatory things are missing.");
        }
        if(options.data){
        	if(options.html){
          		options.html = ejs.render(options.html, options.data);
        	} else { 	
          		options.html = ejs.render(options.text, options.data);
        	}
        }
        if(!options.from){
          options.from = fromEmail;
        }
        if(!options.sender){
          options.sender = sender;
        }
      	transporter.sendMail(options, function(error, response){
			if(error){
				console.log(error);
			} else {
				console.log("Message sent: " + response.message);
				callback(null,response);
			}
		});
	},
}