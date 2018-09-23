var express = require('express');
var expressSession = require('express-session');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var dataFile = require('./data/data.json');


app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 3000);
app.set('appData',dataFile);
app.set('view engine','ejs');
app.set('views','app/views');

app.locals.siteTitle = 'mPOS';
app.use(express.static('app/public'));
app.use(expressSession({
  secret: 'cookie_secret',
  resave: false,
  saveUninitialized: true
}));

app.use(require('./routers/'));
app.use(require('./routers/api'));
app.use(require('./routers/welcome'));
app.use(require('./routers/mPOS'));
app.use(require('./routers/list_sale'));
app.use(require('./routers/open_sale'));
app.use(require('./routers/list_store'));
app.use(require('./routers/add_store'));
app.use(require('./routers/list_products'));
app.use(require('./routers/add_product'));
app.use(require('./routers/list_categories'));
app.use(require('./routers/add_category'));
app.use(require('./routers/list_purchases'));
app.use(require('./routers/add_purchase'));
app.use(require('./routers/add_employee'));
app.use(require('./routers/list_expenses'));
app.use(require('./routers/add_expenses'));

app.use(require('./routers/friends'));


var Server = app.listen(app.get('port'), function(){
  console.log('listen to port '+app.get('port'));
});











//reload(Server, app);



//var http = require('http');
//var myServer = http.createServer(function(req, res){
//  res.writeHead(200,{"Content-Type":"text/html"});
//  res.write('<h1>connection meetups</h1>');
//  res.end();
//});
//myServer.listen(3000);
//console.log('go to port 3000');
