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
            findAllUsersAdmin: findAllUsersAdmin,
            register: register,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser:updateUser,
            updateUserByAdmin:updateUserByAdmin,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            login: login
        }

        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;

        }

        function getCurrentUser () {
            var projectUser = $http.get("/api/project/loggedin");
            return projectUser;
        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function createUser(user){
            return $http.post("/api/project/admin/user", user);
        }

        function findUserByCredentials(credentials){
            return $http.get("/api/project/user?username=" + credentials.username + "&password=" + credentials.password);

        }

        function findUserById(userId){
            return $http.get("/api/project/admin/user/"+ userId);
        }

        function findUserByUsername(username){
            return $http.get("/api/project/user?username="+ username);
        }

        function findAllUsers(){
            return $http.get("/api/project/user");
        }

        function findAllUsersAdmin() {
            return $http.get("/api/project/admin/user");
        }



        function deleteUserById(userId) {
            return $http.delete("/api/project/admin/user/"+ userId);
        }

        function updateUser(userId, user)
        {
            return $http.put("/api/project/user/"+ userId, user);
        }

        function updateUserByAdmin(userId, updatedUser) {
            return $http.put("/api/project/admin/user/" + userId, updatedUser);
        }


        function logout(){
            return $http.post("/api/project/logout");
        }

        function login(user){

            return $http.post("/api/project/login", user);
        }

    }

})();
