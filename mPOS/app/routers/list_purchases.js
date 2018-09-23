var express = require('express');
var router = express.Router();


router.get('/list_purchases', function(req, res){


  res.render('list_purchases',{
    pageTitle: '|| List Purchases',
    pageID:'list_purchases'
  });
});

module.exports = router;
