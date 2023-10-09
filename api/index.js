var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs=require('express-handlebars');

var ctrlRouter = require('../routes/ctrl');
var leadersRouter = require('../routes/leaders');
var publicRouter = require('../routes/public');

var app = express();
var db = require('../config/connection')
var session=require('express-session')
var fileUpload = require('express-fileupload')

// view engine setup\
app.use(express.static(__dirname + '../public'));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

app.engine('hbs',hbs.engine({
  extname:'hbs',
  defaultLayout:'layout',
  // layoutsDir:__dirname+'../views/layout/',
  layoutsDir:path.join(__dirname,'../views/layout/'),
  // partialsDir:__dirname+'../views/partials/'
  partialsDir:path.join(__dirname,'../views/partials/')
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({secret:"Key"}))
app.use(fileUpload())

db.connect((err)=>{
  if(err)
  console.log('Error'+err )
  else
  console.log('Database Connected');
  
})


app.use('/admin', ctrlRouter);
app.use('/leader', leadersRouter);
app.use('/', publicRouter);

//  vercel connecting
app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get('/api/item/:slug', (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

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