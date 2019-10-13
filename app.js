const config = require('./config/config');
const port = process.env.PORT || config.port;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

// Passport config
require('./config/passport')(passport);

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(config.session));

// Flesh message
app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// pages routing
app.use(require('./routers/index'));

// Start our server
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
