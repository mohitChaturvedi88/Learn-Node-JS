var express = require('express');
var router = express.Router();


router.get('/list_sale', function(req, res){


  res.render('list_sale',{
    pageTitle: '|| List Sales',
    pageID:'list_sale'
  });
});

module.exports = router;
