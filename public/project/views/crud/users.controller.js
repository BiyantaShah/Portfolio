(function(){
    angular
        .module("NoteTakerWebsite")
        .controller("UserController",UserController);

    function UserController($scope,UserService){


        var currentAllUsers= []; //Forms of the current user
        var currentUser = null;//Current user is stored
        var selectedUserIndex = -1; //the index of the form selected



        //event declarations
        $scope.addUser = addUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;
        $scope.updateUser = updateUser;

        currentUser = UserService.findAllUsers(renderAllUsers);
        //event implementations

        function addUser(username,firstName,lastName) {

            if (username != null && firstName != null && lastName != null) {
                var newUser = {
                    "_id": null ,
                    "username": username,
                    "firstName": firstName,
                    "lastName": lastName
                };

                UserService.createUser(newUser, renderAdd);
            }
        }

        function deleteUser(index) {
            UserService.deleteUserById(currentAllUsers[index]._id, renderDelete);
        }



        function selectUser(index) {
            selectedUserIndex = index;
            var selectUser = currentAllUsers[index];
            $scope.username = selectUser.username ;
            $scope.firstName = selectUser.firstName ;
            $scope.lastName = selectUser.lastName ;


        }


        function updateUser(username,firstName,lastName,type) {
            if(selectedUserIndex != -1){
                var selectedUser = currentAllUsers[selectedUserIndex];
                selectedUser.username = username;
                selectedUser.firstName = firstName;
                selectedUser.lastName = lastName;

                UserService.updateUser(selectedUser._id, selectedUser, renderUpdate);

                $scope.username = null;
                $scope.firstName = null;
                $scope.firstName = null;

            }
        }

        function renderAllUsers(userI) {

            $scope.users = userI;
            currentAllUsers = userI;

        }

        function renderAdd(newUser) {
            $scope.username = null;
            $scope.firstName = null;
            $scope.lastName = null;
            currentAllUsers.push(newUser);
            $scope.users = currentAllUsers;

        }

        function renderDelete(allUsers) {
            UserService.findAllUsers(renderAllUsers);

        }

        function renderUpdate(newUser) {
            UserService.findAllUsers(renderAllUsers);
            selectedUserIndex = -1;
            $scope.username = null;
            $scope.firstName = null;
            $scope.lastName = null;
        }

    }
})();

