var passport = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app,userModel) {


    passport.use('assignment',   new LocalStrategy(assLocalStrategy));
    var auth = authorized;


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/assignment/login",passport.authenticate('assignment') , login);

    app.post("/api/assignment/admin/user",      auth, createUser);
    app.delete("/api/assignment/admin/user/:id",auth, deleteUser);
    app.get("/api/assignment/admin/user",      auth,  findAllUsers);
    app.put("/api/assignment/user/:id",        auth,  updateUser);
    app.get("/api/assignment/user?username=username",            auth, findUserByUsername);
    app.put("/api/assignment/admin/user/:id",    updateUserAdmin);

    app.get("/api/assignment/user?username=username&password=password",findUserByCredentials);


    app.get("/api/assignment/loggedin",               loggedin);
    app.post("/api/assignment/logout",                logout);
    app.get("/api/assignment/admin/user/:id",         findUserById);
    app.post("/api/assignment/register",              register);



    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }



    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    function assLocalStrategy(username, password, done){

        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        newUser.password = bcrypt.hashSync(newUser.password);

                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }


    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['student'];

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req,res){
        if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
            if(isAdmin(req.user)) {
                userModel
                    .findAllUsers()
                    .then(
                        function(doc){
                            res.json(doc);
                        },
                        // send error if promise rejected
                        function(err ){
                            res.status(400).send(err);
                        }
                    );
            } else {
                res.status(403);
            }
        }
    }


    function deleteUser(req, res) {
        var userId = req.params.id;

        if(isAdmin(req.user)) {

            userModel
                .deleteUser(userId)
                .then(
                    function(user){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }


    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        var user = null;

        var credentials = {"username" : username,
            "password" : password};
        userModel
            .findUserByCredentials(credentials)
            .then(
                function (response) {
                    user = response;
                    req.session.currentUser = user;
                    res.json(user);

                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserById(req,res){
        var userId = req.params.id;
        var user = null;

        userModel.findUserById(userId)
            .then(
                function (doc) {
                    user = doc;
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req,res){
        var username = req.query.username;
        var user = null;

        // console.log(userId);
        userModel
            .findUserByUsername(username)
            .then(
                function (doc) {
                    user = doc;
                    res.json(doc);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req,res){
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function logout(req,res){
        req.logOut();
        res.send(200);
    }

    function login(req, res) {

        var user = req.user;
        res.json(user);
    }


    function isAdmin(user) {
        if(user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    function updateUser(req, res) {

        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(response){
                    req.session.currentUser = updatedUser;
                    req.user = newUser;
                    res.json(response);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }



    function updateUserAdmin(req, res) {

        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);

        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        }
        else {
            newUser.roles = ["student"];
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }




};