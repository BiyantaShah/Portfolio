(function(){



    angular
        .module("FormBuilderApp")
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
            getCurrentUser: getCurrentUser,
            logout: logout
        };

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser () {
           var currentUser = $http.get("/api/assignment/loggedin");
            return currentUser;
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

        function logout(){
            return $http.post("/api/assignment/logout");
        }




        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/"+ userId);
        }

        function updateUser(userId, user)
        {
            console.log( userId);
            return $http.put("/api/assignment/user/"+ userId, user);
        }



    }

})();
