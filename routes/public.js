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
  
  userHelpers.getHouseResult().then((result) => {
    res.render('users/public/dashboard', {title:'Dashboard', dashboard: true, result: result });
  });
  
});

router.get('/dashboard/results', function (req, res, next) {
  var result = [

  ]
  res.render('users/public/results', {title:'Results', dashboard: true, result: result});
});

router.get('/result-search', async (req, res) => {
  const pcode = req.query.pcode;
  
  userHelpers.getResult(pcode).then((result) => {
    res.render('users/public/results', {title:'Results', dashboard: true, result: result});
  })
});



router.get('/demo', function (req, res, next) {
  res.render('users/public/demo', { title: 'About', dashboard: true });
});
module.exports = router;
