
var express = require('express');
var router = express.Router();
var mysql = require("mysql");



var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    //database: "mohitpossystem"
    database: "simplepos"
    //database: "restful_api_demo"
    
  });
  connection.connect(function(err) {
    if (err){
        console.log("ISSUE WITH MYSQL \n" + err);
        process.exit(1);
    } 
    console.log("Database Connected!");
  });
  module.exports.connection = connection;  