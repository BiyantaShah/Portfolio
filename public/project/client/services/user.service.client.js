(function(){



    angular
        .module("NoteTakerWebsite")
        .factory("UserService", UserService);



    function UserService($http,$rootScope){


        var model = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser:updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
            //logout: logout,
            //loggedin: loggedin
        }

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        function findUserByCredentials(credentials){

            return $http.get("/api/assignment/user?username=" + credentials.username + "&password=" + credentials.password);

        }

        function findUserById(userId){
            return $http.get("/api/assignment/user/"+ userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username="+ username);
        }



        function findAllUsers(){
            return $http.get("/api/assignment/user");
        }

        /* function logout(){
         return $http.post("/api/assignment/logout");
         }

         function loggedin(){
         return $http.get("/api/assignment/loggedin")
         }*/



        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/"+ userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/assignment/user/"+ userId, user);
        }



    }

})();
