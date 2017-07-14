var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var students = require('./routes/student');
var exam = require('./routes/exam');
var courses = require('./routes/course');
var cls = require('./routes/class');
var campus = require('./routes/campus');
var account = require('./routes/account');
var teacher = require('./routes/teacher');
var teaching = require('./routes/teaching');
var staff = require('./routes/staff');
var section = require('./routes/section');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var allowCrossDomain = function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', '127.0.0.1:4200');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);
app.set('etag', false);

app.use('/', index);
app.use('/users', users);
app.use('/students', students);
app.use('/accounts', account);
app.use('/campuses', campus);
app.use('/classes', cls);
app.use('/courses', courses);
app.use('/exams', exam);
app.use('/teachers', teacher);
app.use('/teachings', teaching);
app.use('/staffs', staff);
app.use('/sections', section);

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
