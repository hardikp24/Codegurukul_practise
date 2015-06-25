var User = require('../models/User');
var Course = require('../models/Course');

exports.getSignUp =  function(req, res) {
  res.render('signup');
}
exports.postSignUp = function(req, res) {
  var user = new User({
    name: req.body.name,
    email: req.body.username,
    password: req.body.password
  })
  user.save();
  Course.find(function(err, courses) {
    res.render('index', {
      courseList: courses
    });
  });
}

exports.postSignIn = function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      console.log(err);
    }
    if (user) {
      if (user.password == req.body.password) {
        res.send("Valid User");
      } else {
        res.send("Invalid User");
      }
    }
  })
}