var express = require('express');
var router = express.Router();


router.get('/mPOS', function(req, res){


  res.render('mPOS',{
    pageTitle: '|| mPOS',
    pageID:'mPOS'
  });
});

module.exports = router;
