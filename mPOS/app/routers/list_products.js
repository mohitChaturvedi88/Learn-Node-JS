var express = require('express');
var router = express.Router();


router.get('/list_products', function(req, res){


  res.render('list_products',{
    pageTitle: '|| List Products',
    pageID:'list_products'
  });
});

module.exports = router;
