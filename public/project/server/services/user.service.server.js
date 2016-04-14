module.exports = function(app,userModel){
    app.delete("/api/project/user/:userId", deleteUserById);
    app.get("/api/project/user?username=username&password=password",findUserByCredentials);
    app.get("/api/project/user?username=username",findUserByUsername);
    app.get("/api/project/user/:userId",findUserById);
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findAllUsers);
    app.post("/api/project/logout", logout);
    app.get("/api/project/loggedin", loggedin);
    app.put("/api/project/user/:userId",updateUser);
    app.get("/send",getEmail);


    function createUser(req,res){
        var newUser = req.body;
        var users = [];

        userModel
            .createUser(newUser)
            .then(
                function (response) {
                    req.session.projectUser = response;
                    users = response;
                    res.json(response);
                },
                // reject promise if error
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function deleteUserById(req,res){
        var userId = req.params.id;
        userModel.deleteUser(userId);
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
        var userId = req.params.id;
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
        if(req.session.projectUser != null){
            res.json(req.session.projectUser);
        }

        else {
            res.json(null);
        }

    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function updateUser(req,res){
        var userId = req.params.id;
        var updatedUser = req.body;

        userModel.updateUser(userId,updatedUser);
    }

    function getEmail(req,res){


        var email = req.body;

        console.log(email);
        smtpTransport.sendMail(email)
            .then(function(response){
                res.json(response);
            },
            function(err){
                res.status(400).send(err);
            });
    }
};