var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/public/landing_page', { title: 'Public', home:true });
});

router.get('/dashboard', function(req, res, next) {
  res.render('users/public/dashboard', { title: 'About', home:false });
});
module.exports = router;
