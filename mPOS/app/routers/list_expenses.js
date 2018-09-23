var express = require('express');
var router = express.Router();


router.get('/list_expenses', function(req, res){


  res.render('list_expenses',{
    pageTitle: '|| List Expenses',
    pageID:'list_expenses'
  });
});

module.exports = router;
