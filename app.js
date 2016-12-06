var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser=require('body-parser');

var path=require('path');
require('./router/main')(app);
app.set('views',__dirname + '/views');
app.set('maintainance',__dirname + '/maintainance');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname+'/public'));
http://localhost:3000/css/style.css
app.listen(3000);
console.log("server is running");