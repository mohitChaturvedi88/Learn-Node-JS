var express = require('express');
var router = express.Router();


router.get('/list_store', function(req, res){


  res.render('list_store',{
    pageTitle: '|| List Stores',
    pageID:'list_store'
  });
});

module.exports = router;
