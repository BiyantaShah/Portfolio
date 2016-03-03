(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,UserService, $location){

        //event declaration
        $scope.register = register;

        //event implementation
        function register(username,password,confirmPassword, email,firstName,lastName) {

            if(password == confirmPassword) {
                var newUser = {
                    "_id": (new Date).getTime(),
                    "firstName": firstName,
                    "lastName": lastName,
                    "username": username,
                    "password": password,
                    "type":null
                }
            }

            UserService.createUser(newUser, render);


        }

        function render(newUser) {
            if (newUser != null) {
                UserService.setCurrentUser(newUser);
                $location.path('/profile');
            }

        }
    }

})();