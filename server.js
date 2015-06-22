var express = require('express'); //node module
var app = express();

app.set('views',__dirname+'/server/views' );
//console.log(__dirname+"This is variable");

app.set('view engine','jade');

//app.use is used to use middleware
app.use(express.static('public'));

//route

app.get('/', function(req,res){
res.render('index'); 
});

//req= request => HTTP REQUEST obj
//res= request => HTTP Response obj

app.listen('3020');
console.log('Express is listen to localhost 3020');