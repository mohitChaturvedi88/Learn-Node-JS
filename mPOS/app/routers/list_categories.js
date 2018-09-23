var express = require('express');
var router = express.Router();


router.get('/list_categories', function(req, res){


  res.render('list_categories',{
    pageTitle: '|| Add Categories',
    pageID:'list_categories'
  });
});

module.exports = router;
