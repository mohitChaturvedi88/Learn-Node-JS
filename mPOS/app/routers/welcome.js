var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var connectMyDB = require("./connectMyDB.js");

router.get('/welcome', function(req, res){

  var token_id = req.session.token;
if(token_id){

var query = "SELECT * FROM ?? WHERE ??=?";
  var table = ["mpos_users", "token_id", token_id];
  query = mysql.format(query, table);
  connectMyDB.connection.query(query, function (err, rows) {
      if (err) {
          res.json({ "Error": true, "Message": "Error executing MySQL query" });
      } else

   var fname =  rows[0].first_name;
   var lname =  rows[0].last_name;
   var avatar =  rows[0].avatar;
   var joindates = rows[0].user_join_date;
   
   req.session.token = rows[0].token_id;
 


   res.locals.fname = fname;
   res.locals.lname = lname;
   res.locals.avatar = avatar;
   res.locals.joindates = joindates;
 
   

      
       res.render('welcome',{
         pageTitle: '|| Dashboard',
         pageID:'home'
       });
    });
 }else

res.redirect('/');

});

  

module.exports = router;
