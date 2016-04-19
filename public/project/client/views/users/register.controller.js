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
            console.log(user);

            if (user == null) {
                $scope.message = "The fields cannot be empty";
                return;
            }

            if(user.firstName == null || user.firstName == "" ){
                $scope.message = "Please Enter your First Name";
                return;
            }

            if(user.lastName == null || user.lastName == ""){
                $scope.message = "Please Enter your Last Name";
                return;
            }

            if (user.email == "" || user.email == null) {
                $scope.message = "Please Enter your Email-ID";
                return;
            }

            if (user.username == null || user.username == "" ) {
                $scope.message = "Please Enter your Username";
                return;
            }

            if (user.password == "" || user.password2 == "" || user.password == null || user.password2 == null) {
                $scope.message = "Please Enter your Password";
                return;
            }

            if (user.password !== user.password2) {
                $scope.message = "Passwords do not match!";
                return;
            }



            if(user.type == null){
                $scope.message = "Select type of user ";
                return;
            }


            if(!user.check || user.check == null){
                $scope.message = "Accept the Terms and Conditions to Register";
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

            UserService.register(newUser)
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