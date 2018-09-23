var express = require('express');
var jwt = require('jsonwebtoken');
var passportConfig = require('../config/passport');
var router = express.Router();


// http://localhost:3000/
router.get('/', function (req, res, next) {
  res.status(200)
    .json({
      status: 'success',
      message: 'Voila!'
    });
  // create a token

});
//token generation code 

// router.post('/logedin', function (req, res, next) {
//   console.log(req.body.user);
//   var user= req.body.user;
//   var token = jwt.sign({
//     id: user
//   }, passportConfig.secret, {
//     expiresIn: 86400 // expires in 24 hours
//   });
//   res.status(200).send({ auth: true, token: token });
// });

// router.get('/logout', function(req, res) {
//   res.status(200).send({ auth: false, token: null });
// });


//////////////////////
// Postgres queries
//////////////////////

var db = require('../queries');

router.get('/api/projects', db.getAllProjects);
router.get('/api/projects/:projectcode', db.getProject);
router.post('/api/projects', db.createProject);
router.put('/api/projects/:projectcode', db.updateProject);
router.delete('/api/projects/:projectcode', db.removeProject);

router.get('/api/sources', db.getAllSources);
router.get('/api/sources/:sourcecode', db.getSource);
router.post('/api/sources', db.createSource);
router.put('/api/sources/:sourcecode', db.updateSource);
router.delete('/api/sources/:sourcecode', db.removeSource);

router.get('/api/destinations', db.getAllDestinations);
router.get('/api/destinations/:customercode', db.getDestination);
router.post('/api/destinations', db.createDestination);
router.put('/api/destinations/:customercode', db.updateDestination);
router.delete('/api/destinations/:customercode', db.removeDestination);

router.get('/api/toll', db.getAllTolls);
router.get('/api/toll/:tollid', db.getToll);
router.post('/api/toll', db.createToll);
router.put('/api/toll/:tollid', db.updateToll);
router.delete('/api/toll/:tollid', db.removeToll);

router.get('/api/poi', db.getAllPOIs);
router.get('/api/poi/:poiname', db.getPOI);
router.post('/api/poi', db.createPOI);
router.put('/api/poi/:poiname', db.updatePOI);
router.delete('/api/poi/:poiname', db.removePOI);

router.get('/api/user', db.getAllUsers);
router.get('/api/user/:username', db.getUser);
router.post('/api/user', db.createUser);
router.put('/api/user/:username', db.updateUser);
router.delete('/api/user/:username', db.removeUser);

router.get('/api/producttype', db.getAllProducts);
router.get('/api/producttype/:producttypeid', db.getProduct);
router.post('/api/producttype', db.createProduct);
router.put('/api/producttype/:producttypeid', db.updateProduct);
router.delete('/api/producttype/:producttypeid', db.removeProduct);


module.exports = router;