var express = require('express'); //Node Module for express server
var mongoose = require('mongoose'); //Node Module for mongoose server
var bodyParser = require('body-parser'); //Node Module for BP server

var app=express();

app.set('views',__dirname+'/server/views');
console.log(__dirname+"   This is a variable");
app.set('view engine','jade');
app.use(express.static('public')); //static route handling

//Routes
app.use(bodyParser.json());// POST: {"name":"foo","color":"red"}
app.use(bodyParser.urlencoded({extended:true}));// assuming POST:name=foo&color=red<--URL encoding
app.get('/',function(req,res)
{

res.render('index',{courseList:courses});

});

app.get('/addcourse',function(req,res)
{
res.render('addcourse',{courseList:courses});
});



app.post('/addcourse',function(req,res) {
// res.render('addcourse',{courseList:courses});
 // res.send("Data Recieved");
//Create a new course

var course=new Course ({uname:req.body.uname,
						name:req.body.coursename,
						published:req.body.date,
						featured:req.body.feat,
						time:req.body.timer,
						batch:req.body.batches
					});

course.save(function(err){
                Course.find(function(err,courses){
            res.render('view-course',{courses:courses});
        });
    });
});


  

app.post('/deletecourse/:id',function(req,res){
        Course.remove({ _id:req.params.id }, function (err) {
            Course.find(function(err,courses){
            res.render('view-course',{courses:courses});
        });
    });
});



 // Mongoose Connection with MongoDB
mongoose.connect("mongodb://localhost/codegurukul");
console.log("local mongodb opened");

//Mongoose schema
var courseSchema = new mongoose.Schema({
name:String,
featured:Boolean,
published:Date,
time:String,
batch:String
});

//Compile schema into a mongoose model
var Course = mongoose.model('Course',courseSchema);

//User Schema 
var userSchema = new mongoose.Schema({
		name:String,
		username:String,
		password: String
});

var User = mongoose.model('User',userSchema);



 app.get('/signup',function(req,res){
res.render('signup');
 
        });


app.post('/signup',function(req,res){


 var user = new User ({name: req.body.uname, username:req.body.uid,password:req.body.pass});
user.save(function(err){
                User.find(function(err){
            res.render('index',{user:user});
        });
        });
        });
app.post('/login',function(req,res)
{
    User.findOne({username:req.body.username},function(err,user){
        if(user)
        {
            if(user.password==req.body.password)
                res.send('loggedin');
            else
                res.send('passsword incorrect');
        }
        else
        {
            res.send('User not Defind'+req.body.username);

        }
    });
    });







// var fetchCourse=Course.find();//retrieve all the values 

var courses = [
{"name": "C# for Sociopaths", "featured": true, "published": new Date('10/5/2013')},
{"name": "C# for Non-Sociopaths", "featured": true, "published": new Date('10/12/2013')},
{"name": "Super Duper Expert C#", "featured": false, "published": new Date('10/1/2013')},
{"name": "Visual Basic for Visual Basic Developers", "featured": false, "published": new Date('7/12/2013')},
{"name": "Pedantic C++", "featured": true, "published": new Date('1/1/2013')},
{"name": "JavaScript for People over 20", "featured": true, "published": new Date('10/13/2013')},
{"name": "Maintainable Code for Cowards", "featured": true, "published": new Date('3/1/2013')},
{"name": "A Survival Guide to Code Reviews", "featured": true, "published": new Date('2/1/2013')},
{"name": "How to Job Hunt Without Alerting your Boss", "featured": true, "published": new Date('10/7/2013')},
{"name": "How to Keep your Soul and go into Management", "featured": false, "published": new Date('8/1/2013')},
{"name": "Telling Recruiters to Leave You Alon", "featured": false, "published": new Date('11/1/2013')},
{"name": "Writing Code that Doesn't Suck", "featured": true, "published": new Date('10/13/2013')},
{"name": "Code Reviews for Jerks", "featured": false, "published": new Date('10/1/2013')},
{"name": "How to Deal with Narcissistic Coworkers", "featured": true, "published": new Date('2/15/2013')},
{"name": "Death March Coding for Fun and Profit", "featured": true, "published": new Date('7/1/2013')}
];



// app.get('/login',function(req,res)
// {

// res.render('login');

// });
//req=>request res=>response





app.listen(3020);
console.log("Express Server is listening at port 3020");