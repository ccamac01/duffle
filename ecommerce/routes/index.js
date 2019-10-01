var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');


var csrfProtection = csrf();
router.use(csrfProtection); //all routes in this router, should be protected by csrfProtection

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find((err, products) => {
    var productRows = [];
    var rowSize = 3;
    for (var i = 0; i < products.length; i += rowSize){
      productRows.push(products.slice(i, i + rowSize));
    };
    res.render('shop/index', { title: 'E-commerce Website', products: productRows });
  }); // queries DB for Product collection, mongoose object
});

router.get('/user/signup', (req, res, next) => {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', (req, res, next) => {
  res.render('user/profile');
});

module.exports = router;


// 17:46