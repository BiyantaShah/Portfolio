(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,UserService, $location) {

        var vm = this;

        //function declaration
        vm.register = register;

        function init() {

        }

        init();

        //function implementation

        function register(user) {
            $scope.message = null;


            if (user == null) {
                $scope.message = "The fields cannot be empty, please fill them";
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
                $scope.message = "Please Select type of user ";
                return;
            }


            if(!user.check || user.check == null){
                $scope.message = "Please accept the Terms and Conditions to Register";
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
                    if(response.data){
                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }
                    else{
                        $scope.message = "User is already registered";
                        return;
                    }


                });
        }

    }

})();