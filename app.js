var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');

var ctrlRouter = require('./routes/ctrl');
var leadersRouter = require('./routes/leaders');
var publicRouter = require('./routes/public');

var app = express();

// view engine setup\
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs',hbs.engine({
  extname:'hbs',
  defaultLayout:'layout',
  layoutsDir:__dirname+'/views/layout/',
  partialsDir:__dirname+'/views/partials/'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', ctrlRouter);
app.use('/leader', leadersRouter);
app.use('/', publicRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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