var mock = require("./user.mock.json");


module.exports = function(app) {
    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser

    };
    return api;

    function createUser(user){
        var newUser = {
           // _id: (new Date()).getTime(),
            "_id":(new Date()).getTime(),
            "username": user.username,
            "password": user.password,
            "email": user.email
        }

        mock.push(newUser);
        return newUser;

    }

    function findAllUsers(){
        return mock;
    }

    function findUserByCredentials(credentials) {
        var flag = false;
        for (var u in mock){
            if( mock[u].username == credentials.username &&
                mock[u].password == credentials.password) {
                flag = true
                return mock[u];
            }
        }

        if(flag === false) {
            return null;
        }

    }

    function findUserById(userId){
        var flag = false;

        for(var u in mock){
            if(mock[u]._id === userId) {
                flag = true;
                return mock[u];
                break;
            }
        }

        if(flag === false) {
            return null;
        }


    }

    function findUserByUsername(username){

        var flag = false;

        for (var u in mock) {
            if(mock[u].username === username) {
                flag = true;
                return mock[u];
                break;
            }
        }

        if(flag === false) {
            return null;
        }
    }

    function deleteUserById(userId){

        for(var u in mock) {
            if(mock[u]._id === userId) {
                delete mock[u];
            }
        }

    }

    function updateUser(userId, user) {

        for(var u in mock) {
            if(mock[u]._id === userId) {

                mock[u] = user;
                return mock[u];

            }
        }
    }
};
