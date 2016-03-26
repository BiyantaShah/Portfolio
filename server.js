var express = require('express');
var bodyParser = require('body-parser');
var cookieParser  = require('cookie-parser');
var multer = require('multer');
var nodemailer = require("nodemailer");
var app = express();
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    }
});
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());
require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);