var express = require('express');
var router = express.Router();


router.get('/add_expenses', function(req, res){


  res.render('add_expenses',{
    pageTitle: '|| Add Expenses',
    pageID:'add_expenses'
  });
});

module.exports = router;
