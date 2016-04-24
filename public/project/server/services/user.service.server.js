var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require('bcrypt-nodejs');

module.exports = function(app,userModel){

    passport.use('project',   new LocalStrategy(projLocalStrategy));
    var auth = authorized;

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/project/login',passport.authenticate('project'),  login);

    app.post("/api/project/admin/user",             auth,       createUser);
    app.delete("/api/project/admin/user/:userId",        auth,      deleteUserById);
    app.get("/api/project/admin/user",              auth,        findAllUsersAdmin);
    app.put("/api/project/user/:userId",              auth,        updateUserByID);
    app.put("/api/project/admin/user/:userId",         auth,         updateUserAdmin);
    app.get("/api/project/user?username=username",      auth,       findUserByUsername);

    app.get("/api/project/user?username=username&password=password",findUserByCredentials);

    app.get("/api/project/user/:userId",  findUserById);
    app.post("/api/project/register",   register);
    app.get("/api/project/user",    findAllUsers);
    app.post("/api/project/logout",     logout);
    app.get("/api/project/loggedin",    loggedin);


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

    function projLocalStrategy(username, password, done) {
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
        if(newUser.type) {
            newUser.type = newUser.type;
        } else {
            newUser.type = "student";
        }

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsersAdmin();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsersAdmin();
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
        newUser.type = 'student';

        userModel
            .findUserByUsername(newUser.username)
            .then(function(user){
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
            .then(function(user){
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


    function findAllUsersAdmin(req, res){
        if(req.query.username){
            findUserByUsername(req, res);
        }
        else{
            if(isAdmin(req.user)) {
                userModel
                    .findAllUsersAdmin()
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



    function deleteUserById(req, res){
        var userId = req.params.userId;

        if(isAdmin(req.user)) {
            userModel
                .deleteUser(userId)
                .then(
                    function(user){
                        return userModel.findAllUsersAdmin();
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
                    req.session.projectUser = user;
                    res.json(user);

                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req,res){
        var users = [];

        if(req.query.username == null && req.query.password == null) {
            userModel
                .findAllUsers()
                .then(
                    function (response) {
                        users = response;
                        res.json(users);
                    },
                    // reject promise if error
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        else if (req.query.username != null && req.query.password == null){
            findUserByUsername(req,res);
        }

        else{
            findUserByCredentials(req,res);

        }


    }

    function findUserById(req,res){
        var userId = req.params.userId;
        var user = null;

        userModel.findUserById(userId)
            .then(
                function (response) {
                    user = response;
                    res.json(user);
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
                function (response) {
                    user = response;
                    res.json(user);
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

        if(user.type == "admin") {
            return true;
        }
        return false;
    }

    function updateUserByID(req,res){
        var userId = req.params.userId;
        var updatedUser = req.body;
        updatedUser.password = bcrypt.hashSync(updatedUser.password);


        userModel.updateUser(userId,updatedUser)
            .then(function(response){
                    req.session.projectUser = updatedUser;
                    //console.log(updatedUser);
                    res.json(updatedUser);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function updateUserAdmin(req, res) {
        var newUser = req.body;

        if(newUser.type) {
            newUser.type = newUser.type;
        }
        else {
            newUser.type = "student";
        }

        userModel
            .updateUser(req.params.userId, newUser)
            .then(function(doc){
                    console.log(doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            )

    }

};