(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);



    function UserService($rootScope){

        //initializing array of users with JSON data

        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ]

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser: getCurrentUser
        }

        return api;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByCredentials(username, password,callback) {
            var flag = false;

            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password){
                    callback(users[i]);
                    flag = true;
                }

            }
            if(flag == false){
                callback(null);
            }

        }

        function findAllUsers(callback)
        {
            callback(users);
        }

        function createUser(user, callback) {
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback) {

            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i,1);
                }
            }
            callback(users);

        }

        function updateUser(userId, user, callback)
        {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i] = user;
                   break;
                }
            }
            callback(user);


        }

    }

})();
