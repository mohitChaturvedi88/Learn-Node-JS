var mysql = require("mysql");
var formidable = require('formidable');
var fs = require('fs');
var randtoken = require('rand-token');
var path = require('path');
const fileUpload = require('express-fileupload');
http = require("http");


function REST_ROUTER(router, connection, md5) {
    var self = this;
    self.handleRoutes(router, connection, md5);
}

REST_ROUTER.prototype.handleRoutes = function (router, connection, md5) {
    var self = this;
    router.get("/", function (req, res) {

        var token = randtoken.generate(100);
        console.log(token);
         //res.json({ Message: "Hello Mohit" });
         res.sendFile (__dirname+"/index.html");
    });

    router.get("/users", function (req, res) {
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

    router.get("/users/:user_id", function (req, res) {
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

    router.post("/users", function (req, res) {

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

    router.put("/users", function (req, res) {
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

    router.delete("/users/:email", function (req, res) {
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

  router.post('/upload', function (req, res) {
        

        var formData = formidable.IncomingForm();
        formData.parse(req, function (err, fileds, files) {
            var oldpath = files.filetoupload.path;
            
            var newpath = 'C:/MyUploads/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.send('File uploaded and moved!');
                res.end();

            });
        });
       
    }); 

}



module.exports = REST_ROUTER;
