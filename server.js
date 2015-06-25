var express = require('express');
//MongoDb Driver or Middleware
var mongoose = require('mongoose');
//
var bodyParser = require('body-parser');
var userController = require('./server/controllers/user');
var courseController = require('./server/controllers/course');
var app = express();

// /home/sobingt/projects/Codegurukul_practice/server/views

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

//app.use is used to use middlewares
app.use(express.static('public')); //static route handling
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
// assuming POST: name=foo&color=red <-- URL encoding
//
// or POST: {"name":"foo","color":"red"} <-- JSON encoding


//Mongoose Connection with MongoDB
mongoose.connect('mongodb://localhost/devcodegurukul');
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

//courses Routes
app.get('/', courseController.index);
app.get('/addcourse', courseController.getAddCourse);
app.post('/addcourse', courseController.postAddCourse);
app.get('/viewcourses', courseController.getAllCourses);
app.post('/deletecourse/:id', courseController.deleteCourse);

//User Routes
app.get('/signup', userController.getSignUp);
app.post('/signup', userController.postSignUp);
app.post('/signin', userController.postSignIn);

//req=request =>HTTP REQUEST object
//res=response =>HTTP RESPONSE object

app.listen(3000);
console.log("Express server is listening at port 3000");