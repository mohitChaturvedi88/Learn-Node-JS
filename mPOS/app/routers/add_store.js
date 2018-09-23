var express = require('express');
var router = express.Router();


router.get('/add_store', function(req, res){


  res.render('add_store',{
    pageTitle: '|| Add New Store',
    pageID:'add_store'
  });
});

module.exports = router;
