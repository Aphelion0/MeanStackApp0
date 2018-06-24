var express=require('express');
var app=express();
var port =process.env.PORT || 8080;
var morgan=require('morgan');
var mongoose =require('mongoose');
var User=require('./app/models/user');
var bodyParser=require('body-parser');
var path=require('path');
var bcrypt=require('bcrypt-nodejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));

mongoose.connect('mongodb://localhost:27017/Backendapp',function(err){
	if(err){
		console.log("Not connected to db");
	}
	else
	{
		console.log("Connected successfully to mongodb");
	}
});

app.post('/users',function(req,res){
	var user=new User();
	user.username=req.body.username;
	user.password=req.body.password;
	user.email=req.body.email;
	if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""){
			res.json({success:false,message:"Ensure to fill all fields"});
	}else{
	user.save(function(err){
		if(err) {
			res.json({success:false,message:"Already exists"});
		}else{
			res.json({success:true,message:"user created"});
		}
	});
}
});

app.post('/authenticate',function(req,res){
	User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
		if(err) throw err;

		if(!user){
			res.json({success:false,message: "Username does not exist"});
		} else if(user) {
				if(req.body.password!=null){
					res.json({success:true,message:"Welcome"});
				}
				}
	});
});



app.post('/update',function(req,res){
	User.findOne({username:req.body.username},function(err,user){
		if(req.body.mobno!=null && req.body.mobno!="")
		user.mobno=req.body.mobno;
		if(req.body.nation!=null && req.body.nation!="")
		user.nation=req.body.nation;
		if(req.body.status!=null && req.body.status!="")
		user.status=req.body.status;
	user.save();
	res.json({success:true,message:"User updated"});
	});
	
});

app.get('/home',function(req,res){
	res.sendFile(path.join(__dirname+ '/public/app/views/index.html'));
});

app.get('/statusv',function(req,res){
	User.find({},function(err,user){
		if(err){
			throw err;
		}
		else{
			res.send(user);
		}
	});
});


app.listen(port,function(){
console.log("Running at "+port);
});


