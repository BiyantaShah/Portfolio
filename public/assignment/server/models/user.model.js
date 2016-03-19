var q = require("q");



module.exports = function(app) {
    var mock = require("./user.mock.json");

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
        mock.push(user);
        var deferred = q.defer();
        deferred.resolve(mock);

        return deferred.promise;

    }

    function findAllUsers(){
        var deferred = q.defer();
        deferred.resolve(mock);

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var user = null;
        for (var i in mock){
            if( mock[i].username == credentials.username &&
                mock[i].password == credentials.password) {
                user = mock[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(user);
        return deferred.promise;
    }

    function findUserById(userId){
        var deferred = q.defer();
        var user = null

        for(var i in mock) {
            if(mock[i]._id == userId) {
                user = mock[i];
                break;
            }
        }
        deferred.resolve(user);
        return deferred.promise;


    }

    function findUserByUsername(username){

        var user = null;

        for (var i in mock) {
            if(mock[i].username === username) {
                user = mock[i];
                break;
            }
        }

        var deferred = q.defer();
        deferred.resolve(user);
        return deferred.promise;
    }

    function deleteUserById(userId){

        for(var i in mock){
            if(mock[i]._id==userId){
                mock.splice(i,1);
                break;
            }
        }

    }

    function updateUser(userId, user) {

        for(var i in mock){
            if(mock[i]._id==userId){
                mock[i]=user;
                break;
            }
        }
    }
};
