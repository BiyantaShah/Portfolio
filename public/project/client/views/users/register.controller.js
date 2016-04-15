(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,UserService, $location) {

        var vm = this;

        //Event handler declaration
        vm.register = register;
        vm.sendEmail = sendEmail;

        function init() {

        }

        init();

        //Event handler implementation

        function register(user) {
            $scope.message = null;

            if (user == null) {
                $scope.message = "The fields cannot be empty";
                return;
            }

            if (user.username == null) {
                $scope.message = "Please Enter your Username";
                return;
            }

            if (user.password == null || user.password2 == null) {
                $scope.message = "Please Enter your Password";
                return;
            }

            if (user.password !== user.password2) {
                $scope.message = "Passwords do not match!";
                return;
            }

            if (user.email == null) {
                $scope.message = "Please Enter your Email-ID";
                return;
            }

            if (user.password == user.password2) {

                var newUser = {
                   // "._id": (new Date).getTime(),
                    "firstName": vm.user.firstName,
                    "lastName": vm.user.lastName,
                    "username": vm.user.username,
                    "password":vm.user.password,
                    "email": vm.user.email,
                    "type": vm.user.type
                };
            }

            UserService.createUser(newUser)
                .then(function (response) {
                    UserService.setCurrentUser(response.data);
                    $location.path('/profile');
                });
        }

        function sendEmail(emailId){

            $scope.message = "An email has been sent to "+ emailId + ". Please check your inbox!";
            return $scope.message;


        }
    }

})();