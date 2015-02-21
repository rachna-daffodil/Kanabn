var express=require('express');
var db=require('../db/db.js');


module.exports.password= {

	   changepassword:function(callback)
	    {
        var text = "";

          var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

         for( var i=0; i < 9; i++ )
            {
                 text += charset.charAt(Math.floor(Math.random() * charset.length));
             }
             console.log(text);
             callback(null,text);

	   },

       generatetokan:function(callback)
       {
       	var text=""
          var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

         for( var i=0; i <32; i++ )
            {
                 text += charset.charAt(Math.floor(Math.random() * charset.length));
             }
          console.log(text);
           callback(null,text);
 

       },
      

	}
