module.exports = function(app,model){
    app.delete("/api/assignment/user/:id", deleteUserById);
    app.get("/api/assignment/user?username=username&password=password",findUserByCredentials);
    app.get("/api/assignment/user?username=username",findUserByUsername);
    app.get("/api/assignment/user/:id",findUserById);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user", findAllUsers);
    app.put("/api/assignment/user/:id",updateUser);


    function deleteUserById(req,res){
        var userId = req.params.userId;
        var user = model.deleteUserById(userId);
        res.json(user);
    }

    function findUserByCredentials(req,res){
        var username = req.params.username;
        var password = req.params.password
        var user = model.findUserByCredentials(username, password);
        res.json(user);
    }

    function findAllUsers(req,res){
        res.json(model.findAllUsers());
    }

    function findUserById(req,res){
        var userId = req.params.userId;
        var user = model.findUserById(userId);
        res.json(user);
    }



    function findUserByUsername(req,res){
        var username = req.body;
        var user = model.findUserByUsername(username);
        res.json(user);
    }

    function loggedin(req,res){
        res.json(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }

    function register(req,res){
        var user = req.body;
        user = model.createUser(user);
        req.session.currentUser = user;
        res.json(user);

    }

    function updateUser(req,res){
        var userId = req.params.userId;
        var user = req.body;
        var update = model.updateUser(userId,user);
        res.json(update);
    }
}