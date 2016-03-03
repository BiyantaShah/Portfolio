(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("LoginController", LoginController);

    function LoginController($scope, UserService, $location,$rootScope) {

        //event declaration
        $scope.login = login;

        //event implementation
        function login(username,password) {
            var user;
            user = UserService.findUserByCredentials(username, password,render);
        }


        function render(user) {
            if (user != null) {
                UserService.setCurrentUser(user);
                $location.path('/profile');
            }

        }

    }

})();