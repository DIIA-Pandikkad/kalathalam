var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/public/landing_page', { title: 'Public', dashboard:false });
});

router.get('/dashboard', function(req, res, next) {
  res.render('users/public/dashboard', { title: 'About', dashboard:true });
});

router.get('/demo', function(req, res, next) {
  res.render('users/public/demo', { title: 'About', dashboard:true });
});
module.exports = router;
