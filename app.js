const config = require('./config/config');
const port = process.env.PORT || config.port;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: config.session.cookie,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// pages routing
app.use(require('./routers/index'));

// Start our server
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
