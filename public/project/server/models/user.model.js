var q = require("q");



module.exports = function(app) {
    var users = require("./user.mock.json");

    var api = {
        createUser: createUser,
        deleteUserById: deleteUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,


    };
    return api;

    function createUser(user){
        users.push(user);
        var deferred = q.defer();
        deferred.resolve(users);

        return deferred.promise;

    }

    function findAllUsers(){
        var deferred = q.defer();
        deferred.resolve(users);

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var user = null;
        for (var i in users){
            if( users[i].username == credentials.username &&
                users[i].password == credentials.password) {
                user = users[i];

                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(user);
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        var user = null;

        for(var i in users) {
            if(users[i]._id == userId) {
                user = users[i];
                break;
            }
        }
        deferred.resolve(user);
        return deferred.promise;


    }

    function findUserByUsername(username){

        var user = null;

        for (var i in users) {
            if(users[i].username === username) {
                user = users[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(user);
        return deferred.promise;
    }

    function deleteUserById(userId){

        for(var i in users){
            if(users[i]._id==userId){
                users.splice(i,1);
                break;
            }
        }

    }

    function updateUser(userId, user) {

        for(var i in users){
            if(users[i]._id==userId){
                users[i]=user;
                break;
            }
        }
    }


};

