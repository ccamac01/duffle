var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var {isLoggedIn, notLoggedIn} = require('../middleware/user');
var csrfProtection = csrf();
router.use(csrfProtection); //all routes in this router, should be protected by csrfProtection


// REQUIRE LOGGED IN USER
router.get('/profile', isLoggedIn , (req, res, next) => {
    res.render('user/profile');
  });

router.get('/logout', isLoggedIn ,(req, res, next) => {
    req.logout();
    res.redirect('/');
  });

//  ALL OF THE FOLLOWING ROUTES DO NOT REQUIRE SIGNING IN
router.use('/', notLoggedIn ,(req, res, next) => {
    next();
});

  router.get('/signup', (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0});
  });
  
  router.get('/signin', (req, res, next) => {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0});
  });

  router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
  }));

  router.post('/signin', passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
  }));
  
module.exports = router;

