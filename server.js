var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var nodemailer = require("nodemailer");
//database
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// maintaining session
var cookieParser  = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

console.log("goes into making a connection");

if(process.env.MLAB_USER_BIYANTA) {

    var username = process.env.MLAB_USER_BIYANTA; // get from environment
    var password = process.env.MLAB_PASSWORD_BIYANTA; // get from environment
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds125335.mlab.com:25335/heroku_93lwck8w';

}
console.log("makes a connection");

var db = mongoose.connect(connectionString);

var app = express();



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

multer();

if(!process.env.SESSION_SECRET){
    process.env.SESSION_SECRET = "Biyanta";
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave : true,
    saveUninitialized: true
}));



app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//var ipaddress = '127.0.0.1';
var port = process.env.PORT || 3000;

//if (process.env.port) {
//    ipaddress = 'www.biyanta-shah.herokuapp.com'
//}

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app,db,mongoose);

//app.listen(port, ipaddress);
app.listen(port);