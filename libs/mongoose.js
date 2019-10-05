const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.mongoose.uri + config.mongoose.database, config.mongoose.options)
.catch(console.log);
module.exports = mongoose;
