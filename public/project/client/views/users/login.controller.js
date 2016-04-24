(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location, $scope) {


        var vm = this;

        //event declaration
        vm.login = login;

        function init(){

        }
        init();

        //event implementation
        function login(user) {

            if(!user){
                $scope.message = "Enter your Login Details!";
                return $scope.message;
            }


            UserService
                .login({
                    username: user.username,
                    password: user.password

                })
                .then(function (response) {

                    if(response.data != null){

                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }

                    else {
                        vm.password = null;
                        $scope.message = "Invalid Credentials";
                    }
                });

        }



    }

})();

