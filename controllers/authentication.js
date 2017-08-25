const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next){
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'It must provide email and password'});
  }
  // check if the email exists
  User.findOne({ email: email }, function(err, existingUser){
    if (err){
      return next(err);
    }
    // is email exits return error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in user'});
    }
    // is email does not exists create and save a new one
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err){
      if (err) {
        return next(err);
      }
      // respond to request indicating new user was created ok
      res.json({ success: tokenForUser(user) });
    });
  });
}
