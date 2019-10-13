const passport = require('passport');

module.exports.getPage = function(req, res) {
  res.render('login');
};

module.exports.login = function(req, res) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/no',
  })(req, res);
};
