var express = require('express');
var router = express.Router();


router.get('/add_product', function(req, res){


  res.render('add_product',{
    pageTitle: '|| Add Product',
    pageID:'add_product'
  });
});

module.exports = router;
