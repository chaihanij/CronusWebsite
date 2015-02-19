var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var multer  = require('multer');

var app = express();

// import config 
var config = require('./config');
var logger = require('./logger');
// import application log
// var logapp = require('./logapp');
// logger.trace('Entering cheese testing');
// logger.debug('Got application.');
// logger.info('Application is Gouda.');
// logger.warn('Application is quite smelly.');
// logger.error('Application is too ripe!');
// logger.fatal('Application was breeding ground for listeria.');
/**
*   ==========================================
    Config
*   ========================================== 
*/
    

//  ==========================================
// view engine setup
app.set('views', path.resolve('./app/views'));
// app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan(logger.getLogFormat(), logger.getLogOptions()));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));
app.use('/api/documnet', expressJwt({secret: config.secret }));
app.use(multer({ dest: './public/file/uploads'}))
// set Routers
var routes = require('../app/routes/routes');
app.use(routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
            res.format({
                    'application/json': function(){
                    res.send(401, { message: 'Unauthorized' });
                },
                    'text/plain': function(){
                    res.send(401, 'Unauthorized');
                }
            });
        }
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.use(function(err, req, res, next){
    if (err.constructor.name === 'UnauthorizedError') {
        res.format({
            'application/json': function(){
                res.send(401, { message: 'Unauthorized' });
            },
            'text/plain': function(){
                res.send(401, 'Unauthorized');
            }
        });
    }
});

module.exports = app;
