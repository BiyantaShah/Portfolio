module.exports = function(app,model){
    app.post("api/project/delete", deleteUserById);
    app.post("api/project/login",findUserByCredentials);
    app.post("api/project/user",findUserByUsername);
    app.post("api/project/userId",findUserById);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);
    app.post("/api/project/register", register);
    app.get("/api/project/allUsers", findAllUsers);
    app.post("api/project/update",updateUser);


    function deleteUserById(req,res){
        var userId = req.body;
        var user = model.deleteUserById(userId);
        res.json(user);
    }

    function findUserByCredentials(req,res){
        var credentials = req.body;
        var user = model.findUserByCredentials(credentials);
        res.json(user);
    }

    function findAllUsers(req,res){
        // var users = model.findAllUsers();
        res.json(req.body);
    }

    function findUserById(req,res){
        var userId = req.body;
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
        var userId = req.body;
        var user = model.findUserById(userId);
        var update = model.updateUser(userId,user);
        res.json(update);
    }
}