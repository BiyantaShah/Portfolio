(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){

        //event declarations
        $scope.update = update;

        var store; //to store the $rootScope

        store = UserService.getCurrentUser();

        $scope.username = store.username;
        $scope.password = store.password;
        $scope.firstName = store.firstName;
        $scope.lastName = store.lastName;
        $scope.email = store.email;

        //event implementation
        function update(username,password,firstName,lastName, email) {

            var updateUser = {
                "_id": UserService.getCurrentUser()._id,
                "firstName": firstName,
                "lastName": lastName,
                "username": UserService.getCurrentUser().username,
                "password": password,
                "type": UserService.getCurrentUser().type
            }


            UserService.updateUser(UserService.getCurrentUser()._id, updateUser, render)

        }

        function render(updateUser) {
            if (updateUser != null) {
                UserService.setCurrentUser(updateUser);
                $location.path('/profile');
            }

        }
    }

})();