var express = require('express');
var router = express.Router();


router.get('/add_category', function(req, res){


  res.render('add_category',{
    pageTitle: '|| Add Category',
    pageID:'add_category'
  });
});

module.exports = router;
