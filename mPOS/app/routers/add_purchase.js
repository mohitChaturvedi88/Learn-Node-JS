var express = require('express');
var router = express.Router();


router.get('/add_purchase', function(req, res){


  res.render('add_purchase',{
    pageTitle: '|| Add Purchase',
    pageID:'add_purchase'
  });
});

module.exports = router;
