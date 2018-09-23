var express = require('express');
var router = express.Router();


router.get('/open_sale', function(req, res){


  res.render('open_sale',{
    pageTitle: '|| Open Sales',
    pageID:'open_sale'
  });
});

module.exports = router;
