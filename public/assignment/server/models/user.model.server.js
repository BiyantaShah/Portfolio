var q = require("q");



module.exports = function(db,mongoose) {
    var mock = require("./user.mock.json");

    //loading UserSchema

    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);

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

        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });
        return deferred.promise;

    }

    function findAllUsers(){

        var deferred = q.defer();

        UserModel.find(function(err, doc){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {


        var deferred = q.defer();

        UserModel.findOne(

            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {

                    // resolve promise
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;

    }

    function findUserById(userId){
        var deferred = q.defer();
        var user = null;

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;


    }

    function findUserByUsername(username){

        var deferred = q.defer();

        UserModel.findOne(
            { username: username },

            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    function deleteUserById(userId){

        var deferred = q.defer();

        UserModel.remove(
            { _id : userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;

    }

    function updateUser(userId, user) {

        var deferred = q.defer();
       //console.log("In updateUser" + userId);
        UserModel.update(
            { _id : userId},
            { $set: {
                "password": user.password,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "emails": user.emails
            }},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }
};
