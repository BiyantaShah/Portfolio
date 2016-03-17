(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);



    function UserService($http,$rootScope){


        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser:updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        }

        return api;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser () {
            return $http.get("/api/project/loggedin");
        }

        function createUser(user) {
            return $http.post("/api/project/register", user);
        }

        function findUserByCredentials(credentials){
            return $http.post("api/project/login",credentials);

        }

        function findUserById(userId){
            return $http.post("api/project/userId");
        }

        function findUserByUsername(username){
            return $http.post("api/project/user",username);
        }



        function findAllUsers(){
            return $http.get("/api/project/allUsers");
        }

        function logout(){
            return $http.post("/api/project/logout");
        }



        function deleteUserById(userId) {
            return $http.post("api/project/delete");
        }

        function updateUser(userId, user)
        {
            return $http.post("api/project/update");
        }

    }

})();
