var express = require('express');
var expressSession = require('express-session');
var mysql = require("mysql");
var formidable = require('formidable');
var fs = require('fs');
const publicIp = require('public-ip');
var randtoken = require('rand-token');
var Cryptr = require('cryptr');
var bodyParser = require('body-parser');
var path = require('path');
const fileUpload = require('express-fileupload');
http = require("http");
var connectMyDB = require("./connectMyDB.js");
var config = require("./config.js");
cryptr = new Cryptr('Hello_Mohit');
var router = express.Router();



//Write API Code from Here.
router.get("/api/", function (req, res) {

    data = "mohit@gmail.com";
    var encryptedString = cryptr.encrypt(data);
    decryptedString = cryptr.decrypt(encryptedString);

    console.log(encryptedString);  // d7233809c0 
    console.log(decryptedString);


     res.json({ Message: "Hello Mohit" }); 
   // res.sendFile (__dirname+"/spos/pages/examples/dashboard.html");
 //res.sendFile (__dirname+"/spos/pages/examples/login_page.html");
     
});

//Login API Using Token ID.
router.post('/api/login', function(req, res){
  
            mail = req.body.email;
            pass = req.body.password;
            //console.log(req.session.mail);
            //console.log(req.body.password);
            
            //Email validation
            var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (mail == '' || !re.test(mail))
            {
                res.json({ "Error": true, "Message": "Please enter a valid email address." });
            }
            
            var query = "SELECT * FROM ??";
            var table = ["mpos_users"];
            query = mysql.format(query, table);
            connectMyDB.connection.query(query, function (err, rows) {
       
       
                if (err) {
                    res.json({ "Error": true, "Message": "Error executing MySQL query" });
                } 
                if(rows.length == 0){
                    res.json({ "Error": true, "Message": "Email not found." });
                }
                if(mail!==rows[0].user_email){
                    res.json({ "Error": true, "Message": "Email not found." });

                }
 var query = "SELECT * FROM ?? WHERE ??=?";
     var table = ["mpos_users", "user_email", mail];
     query = mysql.format(query, table);
     connectMyDB.connection.query(query, function (err, rows) {


         if (err) {
             res.json({ "Error": true, "Message": "Error executing MySQL query" });
         } 
            if(rows.length >0){
                //console.log(rows[0].user_password);   //here featching complete row data as array and comparing pass with user_password.
              if(pass==rows[0].user_password){
                 //res.json({ "Error": false, "Message": "login sucessfull" }); // valid user then create token and save it into table.
    
                 // Token Generation   
            var token = randtoken.generate(100);
            //Create Session 
             req.session.token = token;
           var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
            var table = ["mpos_users", "token_id", token, "user_email", mail];
            query = mysql.format(query, table);
            connectMyDB.connection.query(query, function (err, rows) {
                if (err) {
    
                    res.json({ "Error": true, "Message": "Error executing MySQL query" });
                } 
                
    res.redirect('/welcome');
            });
               }
                else{
                    res.json({ "Error": true, "Message": "Email and password does not match" });
                 
              }
          }
     });          
});
});


router.get("/api/users", function (req, res) {
    var query = "SELECT * FROM ??";
    var table = ["user_login"];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "Users": rows });
        }
    });
});


router.get("/api/users/:user_id", function (req, res) {
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["user_login", "user_id", req.params.user_id];
    query = mysql.format(query, table);
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "Success", "Users": rows });
        }
    });
});

router.post("/api/users", function (req, res) {
    
            var today = new Date();
    
            var name = post.email;
            var pass = post.password;
    
            var query = "INSERT INTO ??(??,??) VALUES (?,?)";
            var table = ["user_login", "user_email", "user_password", name, md5(pass)];
            query = mysql.format(query, table);
            connection.query(query, function (err, rows) {
                if (err) {
    
                    res.json({ "Error": true, "Message": "Error executing MySQL query" });
                } else {
                    res.json({ "Error": false, "Message": "User Added !" });
                }
            });
        });


        router.put("/api/users", function (req, res) {
            var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
            var table = ["user_login", "user_password", md5(req.body.password), "user_email", req.body.email];
            query = mysql.format(query, table);
            connection.query(query, function (err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": "Error executing MySQL query" });
                } else {
                    res.json({ "Error": false, "Message": "Updated the password for email " + req.body.email });
                }
            });
        });


        router.delete("/api/users/:email", function (req, res) {
            var query = "DELETE from ?? WHERE ??=?";
            var table = ["user_login", "user_email", req.params.email];
            query = mysql.format(query, table);
            connection.query(query, function (err, rows) {
                if (err) {
                    res.json({ "Error": true, "Message": "Error executing MySQL query" });
                } else {
                    res.json({ "Error": false, "Message": "Deleted the user with email " + req.params.email });
                }
            });
        });
    
      router.post('/api/upload', function (req, res) {
            
    
            var formData = formidable.IncomingForm();
            formData.parse(req, function (err, fileds, files) {
                var oldpath = files.filetoupload.path;
                console.log(config.baseurl);
                var newpath = 'C:/node/mPOS/app/public/assests/' + files.filetoupload.name;
                
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err;
                    res.send('File uploaded and moved!');
                    res.end();
    
                });
            });
           
        });
        
//Log out
        router.get("/api/logout", function (req, res) {
            if(req.session.token){
                req.session.destroy();
                res.redirect('/');
               
            }
           
       });


//Add Employee
       router.post("/api/add_employee", function (req, res) {
        if(req.session.token==0){
                res.json({ "Error": false, "Message": "Abe tumse naa hoga bhul jao munna"});
                 }
                 var formData = formidable.IncomingForm();
                 formData.parse(req, function (err, fileds, files){

                 emp_grp = req.body.emp_grp;
                 fname = req.body.fname;
                 lname = req.body.lname;
                 email = req.body.email;
                 assignStore = req.body.assignStore;
                 contact = req.body.contact;
                 Uname = req.body.Uname;
                 password = req.body.password;
                 avatar = req.body.avatar;
                 adminRights = req.body.adminRights;
                 emp_status = req.body.emp_status;
                 gender = req.body.gender;
                 token_id = req.body.token_id;

     if(token_id!==req.session.token) {
        res.json({ "Error": false, "Message": "Wrong Token ID"});
    } 
    if(emp_grp ==' ') {
        res.json({ "Error": false, "Message": "Please enter Employee group."});
    }
    if(fname =='') {
        res.json({ "Error": false, "Message": "Please enter First name."});
    }
    if(lname=='') {
        res.json({ "Error": false, "Message": "Please enter last name."});
    }   
    /* var re = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (email == '' || !re.test(email))
    {
        res.json({ "Error": true, "Message": "Please enter a valid email address." });
    } */
    if(assignStore=='') {
        res.json({ "Error": false, "Message": "Please Assign at least one store." });
    }  
    if(contact=='') {
        res.json({ "Error": false, "Message": "Please enter contact number." });
    }
    if(Uname=='') {
        res.json({ "Error": false, "Message": "Please enter username name."});
    }  
    if(password=='') {
        res.json({ "Error": false, "Message": "Please enter password."});
    }
    if(avatar=='') {
        res.json({ "Error": false, "Message": "Please attach file."});
    } 
    if(adminRights=='') {
        res.json({ "Error": false, "Message": "Please Assign admin rights." });
    }
    if(emp_status=='') {
        res.json({ "Error": false, "Message": "Please enter employee status." });
    } 

    publicIp.v4().then(ip => {
        console.log(ip);
        //=> '46.5.21.123'
    });

    //var joindate  = today();

    var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var table = ["mpos_users", "user_email", "user_password", "username",
    "first_name", "last_name", "admin_rights","phone","avatar", "gender", 
    "active","group_id","store_id", "token_id","user_join_date",
    email,password,Uname,fname ,lname ,adminRights ,contact ,avatar ,gender ,emp_status,emp_grp,assignStore ,token_id
     ];
    query = mysql.format(query, table);

    console.log(query);
   connectMyDB.connection.query(query, function (err, rows) {
        if (err) {

            res.json({ "Error": true, "Message": "Error executing MySQL query" });
        } else {
            res.json({ "Error": false, "Message": "User Added !" });
        }
    });
});

           
           
       
       
   });


        

module.exports = router;
