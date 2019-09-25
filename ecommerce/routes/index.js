var express = require('express');
var router = express.Router();
var Product = require('../models/product');

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

module.exports = router;
