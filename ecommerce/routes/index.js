var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

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

// push product into cart, store in cart object
router.get('/add-to-cart/:id', (req, res, next) => {
  var productId = req.params.id; //retrieve productID in order to add product to session cart
  var cart = new Cart(req.session.cart ? req.session.cart : {}); // if session cart exists, pass to Cart() function else send empty Cart object
  // mongoose query to find product from DB, to add to cart
  Product.findById(productId, (err, product) => {
    if (err) {
      console.log(err);
      return res.redirect('/'); // redirect to home page for now (if product doesn't exist)
    }
    cart.add(product, productId);
    req.session.cart = cart; // update session cart
    console.log(req.session.cart);
    res.redirect('/'); // redirect to product page
  });
});

router.get('/shopping-cart', (req, res, next) => {
  if (!req.session.cart) {
    return res.render('shop/cart', {products: null});
  };
  var cart = new Cart(req.session.cart);
  res.render('shop/cart', {products: cart.itemList(), totalPrice: cart.totalPrice})
});

module.exports = router;
