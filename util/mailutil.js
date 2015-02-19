var nodemailer = require("nodemailer");
var ejs = require("ejs");
var transporter = nodemailer.createTransport();

var fromEmail = "nitesh.singh@daffodilsw.com";
var sender = "KanBan Notification";
module.exports.email ={

	sendemail: function(options, callback)
      {
        if(!options || options.to || options.subject || options.text){
          throw new Error("Mandatory things are missing.");
        }
        if(options.html){
          options.html = options.data ? ejs.render(options.html, options.data) : options.html;
        } else {
          options.text = options.data ? ejs.render(options.text, options.data) : options.text;
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
                       }else{
                           console.log("Message sent: " + response.message);
                       }
                    });
				    

      },
}