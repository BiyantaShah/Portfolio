(function(){
    angular
        .module("NoteTakerWebsite")
        .factory("UserService", UserService);

    function UserService($rootScope){

        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "type": "student"		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "type": "student"		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "type": "faculty"		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "type": "faculty" },
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "type": "other"		}
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
                    break;
                }
            }
            callback(users);

        }

        function updateUser(userId, user, callback)
        {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users[i].username = user.username;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    break;
                }
            }
            callback(users[i]);


        }

    }
})();
