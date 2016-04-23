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

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
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

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app,db,mongoose);

app.listen(port, ipaddress);