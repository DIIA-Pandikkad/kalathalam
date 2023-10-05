var express = require('express');
var router = express.Router();
var ctrlHelpers = require('../helpers/ctrl-room')
var fs = require('fs');
const { log } = require('console');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.loggedIn) {
    res.render('users/ctrl-room/dashboard', { ctrl: true, user: req.session.user });
  } else {
    res.redirect('/admin/auth/login')
  }
});

router.get('/auth/signup', (req,res)=>{
  res.render('users/ctrl-room/ctrl-signup', { ctrl: true })
})

router.post('/auth/signup',(req,res)=>{
  console.log(req.body);
  
  ctrlHelpers.doSignup(req.body).then((response)=>{
    if (response.status) {
        console.log('signup success')
      res.redirect( '/admin/auth/login' )
    } else {
      console.log('signup failed')
        res.redirect('/admin/auth/signup')
    }
    
    console.log(response);
    
  })
})

router.get('/auth/login', function(req, res, next) {
  res.render('users/ctrl-room/ctrl-login', { ctrl: true });
});

router.post('/auth/login',(req,res)=>{
  ctrlHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      req.session.userId=response.user._id
      res.redirect('/admin')
    }else{

      res.redirect('/admin/auth/login')
    }

  })
})

router.get('/auth/logout',(req,res)=>{
  req.session.user=null
  req.session.userLoggidIn=false
  res.redirect('/admin/dashboard')
})



router.get('/candidates', function(req, res, next) {
  if (req.session.loggedIn) {
    res.render('users/ctrl-room/candidate-entry', { ctrl: true, user: req.session.user });
  } else {
    res.redirect('/admin/auth/login')
  }
  
  
});

router.post('/candidates', function(req, res, next) {
  console.log(req.body);
  ctrlHelpers.doCandidateEntry(req.body).then((response)=>{
    if(response.status){
      console.log('candidate entry success')
      res.redirect('/admin/candidates')
    }else{
      console.log('candidate entry failed')
      
      res.redirect('/admin/candidates')
    }
  })
});

router.get('/programs', function(req, res, next) {
  if (req.session.loggedIn) {
    res.render('users/ctrl-room/program-entry', { ctrl: true, user: req.session.user });
  } else {
    res.redirect('/admin/auth/login')
  }
});

router.post('/programs', function(req, res, next) {
  console.log(req.body);
  ctrlHelpers.doProgramEntry(req.body).then((response)=>{
    if(response.status){
      console.log('program entry success')
      res.redirect('/admin/programs')
    }else{
      console.log('program entry failed')
      
      res.redirect('/admin/programs')
    }
  })
});

router.get('/results', function(req, res, next) {
  if (req.session.loggedIn) {
    ctrlHelpers.getPrograms().then((programs)=>{
      console.log(programs);
      res.render('users/ctrl-room/result-entry', { ctrl: true, user: req.session.user, programs:programs });
    })
    
  } else {
    res.redirect('/admin/auth/login')
  }
});

router.post('/results', function(req, res, next) {
  console.log(req.body);
  ctrlHelpers.doResultEntry(req.body).then((response)=>{
    if(response.status){
      console.log('result entry success')
      res.redirect('/admin/results')
    }else{
      console.log('result entry failed')
      
      res.redirect('/admin/results')
    }
  })
});

module.exports = router;
