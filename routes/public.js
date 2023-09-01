var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/public/landing_page', { title: 'Public' });
});

router.get('/results', function(req, res, next) {
  res.render('users/public/resultPage', { title: 'About' });
});
module.exports = router;
