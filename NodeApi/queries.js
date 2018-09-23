var promise = require('bluebird');
var jwt = require('jsonwebtoken');
var passportConfig = require('./config/passport');

var config = require('./config/database');

var options = {
    // Initialization Options
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp(config.connectionString);

/////////////////////
// Query Functions
/////////////////////
// PrjectDetails Method
function getAllProjects(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.any('SELECT * FROM ProjectsDetail')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all projects'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getProject(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var ProjectCode = req.params.projectcode;
    db.one('SELECT * FROM ProjectsDetail WHERE ProjectCode = $1', ProjectCode)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one Project'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createProject(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    //req.body.launched = parseInt(req.body.launched);
    db.none('INSERT INTO ProjectsDetail (ProjectCode, ProjectName, ProjectType, StartDate, ContactName, ContactNo, Address, District, State)' +
            'values(${projectcode}, ${projectname}, ${projecttype}, ${startdate}, ${contactname}, ${contactno}, ${address}, ${district}, ${state})',
            req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted One Project'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateProject(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('UPDATE ProjectsDetail SET ProjectName=$1, ProjectType=$2, StartDate=$3, ContactName=$4, ContactNo=$5, Address=$6, District=$7, State=$8 where ProjectCode=$9', [req.body.projectname, req.body.projecttype, req.body.startdate, req.body.contactname, req.body.contactno, req.body.address, req.body.district, req.body.state, req.params.projectcode])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated Project'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeProject(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var ProjectCode = req.params.projectcode;
    db.result('DELETE FROM ProjectsDetail WHERE ProjectCode = $1', ProjectCode)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} Projects'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

//Source table methods

function getAllSources(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.any('SELECT * FROM source')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all sources'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getSource(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var SourceCode = req.params.sourcecode;
    db.one('SELECT * FROM source WHERE SourceCode = $1', SourceCode)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one Source'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createSource(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    //req.body.launched = parseInt(req.body.launched);
    db.none('INSERT INTO source (sourcecode, SourceName, Latitude, Longitude, ContactName, ContactEmail, ProjectCode)' +
            'values(${sourcecode}, ${sourcename}, ${latitude}, ${longitude}, ${contactname}, ${contactemail}, ${projectcode})',
            req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted One source'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateSource(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('UPDATE source SET SourceName=$1, Latitude=$2, Longitude=$3, ContactName=$4, ContactEmail=$5, ProjectCode=$6 where SourceCode=$7', [req.body.sourcename, req.body.latitude, req.body.longitude, req.body.contactname, req.body.contactemail, req.body.projectcode, req.params.sourcecode])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated source'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeSource(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var SourceCode = req.params.sourcecode;
    db.result('DELETE FROM source WHERE SourceCode = $1', SourceCode)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} Sources'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

//Destination table methods

function getAllDestinations(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.any('SELECT * FROM destination')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all destinations'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getDestination(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var CustomerCode = req.params.customercode;
    db.one('SELECT * FROM destination WHERE CustomerCode = $1', CustomerCode)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one Destination'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createDestination(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    //req.body.launched = parseInt(req.body.launched);
    db.none('INSERT INTO destination (customercode, customertype, customername, customeraddress, latitude, longitude, district,foname,focode,projectcode)' +
            'values(${customercode}, ${customertype}, ${customername}, ${customeraddress}, ${latitude}, ${longitude}, ${district}, ${foname}, ${focode}, ${projectcode})',
            req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted One Destination'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateDestination(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('UPDATE destination SET customertype=$1, customername=$2, customeraddress=$3, latitude=$4, longitude=$5,district=$6, foname=$7,focode=$8, projectcode=$9 where customercode=$10', [req.body.customertype, req.body.customername, req.body.customeraddress, req.body.latitude, req.body.longitude, req.body.district, req.body.foname, req.body.focode, req.body.projectcode, req.params.customercode])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated destination'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeDestination(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var CustomerCode = req.params.customercode;
    db.result('DELETE FROM destination WHERE customercode = $1', CustomerCode)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} Destination'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}
//Toll table methods

function getAllTolls(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.any('SELECT * FROM toll')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all tolls'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getToll(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var TollID = req.params.tollid;
    db.one('SELECT * FROM toll WHERE tollid = $1', TollID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one toll'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createToll(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    //req.body.launched = parseInt(req.body.launched);
    db.none('INSERT INTO toll (tollid, tollname, location, latitude, longitude, roadname, district,upto3axle,from4to6axle,from7ormoreaxle)' +
            'values(${tollid}, ${tollname}, ${location}, ${latitude}, ${longitude}, ${roadname}, ${district}, ${upto3axle}, ${from4to6axle}, ${from7ormoreaxle})',
            req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted One Toll'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateToll(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('UPDATE toll SET tollname=$1, location=$2, latitude=$3, longitude=$4, roadname=$5,district=$6, upto3axle=$7,from4to6axle=$8, from7ormoreaxle=$9 where tollid=$10', [req.body.tollname, req.body.location, req.body.latitude, req.body.longitude, req.body.roadname, req.body.district, req.body.upto3axle, req.body.from4to6axle, req.body.from7ormoreaxle, req.params.tollid])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated destination'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeToll(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var TollID = req.params.tollid;
    db.result('DELETE FROM toll WHERE tollid = $1', TollID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} Toll'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

//POI table methods

function getAllPOIs(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.any('SELECT * FROM poi')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all POIs'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getPOI(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var POIName = req.params.poiname;
    db.one('SELECT * FROM poi WHERE poiname = $1', POIName)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one POI'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createPOI(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('INSERT INTO poi (poiname, latitude, longitude, category)' +
            'values(${poiname}, ${latitude}, ${longitude}, ${category})',
            req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted One POI'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updatePOI(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('UPDATE poi SET latitude=$1, longitude=$2, category=$3 where poiname=$4', [req.body.latitude, req.body.longitude, req.body.category,req.params.poiname])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated POI'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removePOI(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var POIName = req.params.poiname;
    db.result('DELETE FROM poi WHERE poiname = $1', POIName)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} POI'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}

//ProjectUserMapping table methods

function getAllUsers(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.any('SELECT * FROM ProjectUserMapping')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all Users'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getUser(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var UserName = req.params.username;
    db.one('SELECT * FROM ProjectUserMapping WHERE username = $1', UserName)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one User'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createUser(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('INSERT INTO ProjectUserMapping (UserName, ProjectCode)' +
            'values(${username}, ${projectcode})',
            req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted One user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateUser(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('UPDATE ProjectUserMapping SET ProjectCode=$1 where UserName=$2', [req.body.projectcode, req.params.username])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated User'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeUser(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var UserName = req.params.username;
    db.result('DELETE FROM ProjectUserMapping WHERE username = $1', UserName)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} User'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}
//ProductTypes table methods

function getAllProducts(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.any('SELECT * FROM ProductTypes')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all products'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getProduct(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var ProductTypeID = req.params.producttypeid;
    db.one('SELECT * FROM ProductTypes WHERE producttypeid = $1', ProductTypeID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved one product'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function createProduct(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('INSERT INTO ProductTypes (producttype, customertype)' +
            'values(${producttype}, ${customertype})',
            req.body)
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted One product'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateProduct(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    db.none('UPDATE ProductTypes SET producttype=$1,customertype=$2 where producttypeid=$3', [req.body.producttype, req.body.customertype,req.params.producttypeid])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated product'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function removeProduct(req, res, next) {
    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    // jwt.verify(token, passportConfig.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // });
    var ProductTypeID = req.params.producttypeid;
    db.result('DELETE FROM ProductTypes WHERE producttypeid = $1', ProductTypeID)
        .then(function (result) {
            /* jshint ignore:start */
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Removed ${result.rowCount} product'
                });
            /* jshint ignore:end */
        })
        .catch(function (err) {
            return next(err);
        });
}


/////////////
// Exports
/////////////
module.exports = {
    //module for project
    getAllProjects: getAllProjects,
    getProject: getProject,
    createProject: createProject,
    updateProject: updateProject,
    removeProject: removeProject,

    //module for source
    getAllSources: getAllSources,
    getSource: getSource,
    createSource: createSource,
    updateSource: updateSource,
    removeSource: removeSource,

    //module for destination
    getAllDestinations: getAllDestinations,
    getDestination: getDestination,
    createDestination: createDestination,
    updateDestination: updateDestination,
    removeDestination: removeDestination,

    //module for tolls
    getAllTolls: getAllTolls,
    getToll: getToll,
    createToll: createToll,
    updateToll: updateToll,
    removeToll: removeToll,

    //module for POI
    getAllPOIs: getAllPOIs,
    getPOI: getPOI,
    createPOI: createPOI,
    updatePOI: updatePOI,
    removePOI: removePOI,

    //module for ProjectUserMapping
    getAllUsers: getAllUsers,
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser,

    //module for ProductTypes
    getAllProducts: getAllProducts,
    getProduct: getProduct,
    createProduct: createProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct
};