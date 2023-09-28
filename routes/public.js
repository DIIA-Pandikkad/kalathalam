var express = require('express');
var router = express.Router();
var Handlebars = require('handlebars');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('users/public/landing_page', { title: 'Public', dashboard: false });
});

router.get('/dashboard', function (req, res, next) {
  res.render('users/public/dashboard', { dashboard: true });
});

router.get('/dashboard/results', function (req, res, next) {
  
  var results = [
    {
      ProgramN: 'Song Arab',
      ProgramC: 'SS10',
      data: [{ CCode: 84, CName: 'John', Program: 'Song Arab', PCode: 'SS10', pos: 1, grade: 'A', score: 10, first: true },
      { CCode: 84, CName: 'John', Program: 'Song Arab', PCode: 'SS10', pos: 2, grade: 'A', score: 9, second: true },
      { CCode: 84, CName: 'John', Program: 'Song Arab', PCode: 'SS10', pos: 3, grade: 'A', score: 8, third: true },
      { CCode: 84, CName: 'John', Program: 'Song Arab', PCode: 'SS10', pos: 4, grade: 'A', score: 7,  },
      { CCode: 84, CName: 'John', Program: 'Song Arab', PCode: 'SS10', pos: 5, grade: 'A', score: 6,  },
      { CCode: 84, CName: 'John', Program: 'Song Arab', PCode: 'SS10', pos: 6, grade: 'A', score: 5,  }]
    }]

    
    
  console.log(results[0]);
  res.render('users/public/results', { dashboard: true, results: results[0] });
});



router.get('/demo', function (req, res, next) {
  res.render('users/public/demo', { title: 'About', dashboard: true });
});
module.exports = router;
