var config = require('./config');
var log4js = require('log4js');
log4js.configure(config.log4js);
var log = log4js.getLogger('Application');
log.setLevel('ALL');
module.exports = log;