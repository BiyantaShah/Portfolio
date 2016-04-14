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
            getCurrentUser: getCurrentUser,
            getEmail:getEmail,
            logout: logout
        }

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser () {
            var projectUser = $http.get("/api/project/loggedin");
            return projectUser;
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function findUserByCredentials(credentials){
            return $http.get("/api/project/user?username=" + credentials.username + "&password=" + credentials.password);

        }

        function findUserById(userId){
            return $http.get("/api/project/user/"+ userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+ username);
        }



        function findAllUsers(){
            return $http.get("/api/project/user");
        }




        function deleteUserById(userId) {
            return $http.delete("/api/project/user/"+ userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/project/user/"+ userId, user);
        }

        function getEmail(emailId){
            console.log(emailId);
            return $http.get("/send",emailId);
        }

        function logout(){
            return $http.post("/api/project/logout");
        }

    }

})();
