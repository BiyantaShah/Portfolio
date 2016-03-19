module.exports = function(app,userModel){
    app.delete("/api/assignment/user/:userId", deleteUserById);
    app.get("/api/assignment/user?username=username&password=password",findUserByCredentials);
    app.get("/api/assignment/user?username=username",findUserByUsername);
    app.get("/api/assignment/user/:userId",findUserById);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.put("/api/assignment/user/:userId",updateUser);


    function createUser(req,res){
        var newUser = req.body;
        var users = [];

        userModel
            .createUser(newUser)
            .then(
                function (doc) {
                    users = doc;
                    res.json(doc);
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
                function (doc) {
                    user = doc;
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
                    function (doc) {
                        users = doc;
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

    /*function loggedin(req,res){
        res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }*/


    function updateUser(req,res){
        var userId = req.params.id;
        var updatedUser = req.body;

        userModel.updateUser(userId,updatedUser);
    }
};