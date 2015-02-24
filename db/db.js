var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var register = new Schema({
  name : String ,
  email : {type:String,unique:true},
  password : String,
  verify_token:String,
  verify:{type:Boolean,default:false},
  mobile:Number,
  image:String,
  skype:String

},{collection:"users"});
register.plugin(uniqueValidator);


var projectInfo= new Schema({
	
	projectName:String,
	email:{type:Array,default:[]}
},{collection:"projects"});


var taskInfo= new Schema({
	     project_id:String,
	     taskname:String,
	     description:String,
	     sequence:{type:Number,default:0},
	     status1:{type:String,default:"backlog"},
	     due_date:Date,
	     completion_date:{type:Date,default:" "},
	     created_by:String,
	     assigned_date:{type:Date,default:" "},
         modified_date:{type:Date,default:" "},
         comments:{email:{type:String,default:[]},comment:{type:String,default:[]},on_date:String}
     },{collection:"tasks"});

 
module.exports.user= mongoose.model('singup',register);
module.exports.projects  = mongoose.model('projectInfo',projectInfo); 
module.exports.tasks= mongoose.model('detail',taskInfo);