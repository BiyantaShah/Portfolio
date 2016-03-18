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
        res.json(userModel.createUser(newUser));

    }

    function deleteUserById(req,res){
        var userId = req.params.userId;
        var user = userModel.deleteUserById(userId);
        res.json(user);
    }

    function findUserByCredentials(req,res){
        var credentials = {
            username : req.query.username,
            password : req.query.password
        };

        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    }

    function findAllUsers(req,res){
        if(req.query.username == null && req.query.password == null){

            var users = userModel.findAllUsers();
            res.json(users);
        }

        else if (req.query.username != null && req.query.password == null) {
            findUserByUsername(req,res);
        }

        else {
            findUserByCredentials(req,res);
        }


    }

    function findUserById(req,res){
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        res.json(user);
    }



    function findUserByUsername(req,res){
        var username = req.query.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    /*function loggedin(req,res){
        res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }*/


    function updateUser(req,res){
        var userId = req.params.userId;
        var user = req.body;
        var update = userModel.updateUser(userId,user);
        res.json(update);
    }
};