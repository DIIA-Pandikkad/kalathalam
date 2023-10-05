var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');
var userHelpers = require('../helpers/userhelper');
const { param } = require('./public');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users/public/landing_page', { title: 'Public', dashboard: false });
});

router.get('/dashboard', function (req, res, next) {
  if (req.session.loggedIn) {
    res.render('users/public/dashboard', {title:'Dashboard', dashboard: true, user: req.session.user });
  } else {
  res.render('users/public/dashboard', {title:'Dashboard', dashboard: true });
  }
});

router.get('/dashboard/results', function (req, res, next) {
  var result = [

  ]
  res.render('users/public/results', {title:'Results', dashboard: true, result: result, user: req.session.user });
});

router.get('/result-search', async (req, res) => {
  const pcode = req.query.pcode;
  
  userHelpers.getResult(pcode).then((result) => {
    res.render('users/public/results', {title:'Results', dashboard: true, result: result, user: req.session.user });
  })
});



router.get('/demo', function (req, res, next) {
  res.render('users/public/demo', { title: 'About', dashboard: true });
});
module.exports = router;
