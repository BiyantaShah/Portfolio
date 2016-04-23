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

            console.log("comes here");
            console.log(user);
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
                    console.log(response.data);
                    if(response.data != null){

                        UserService.setCurrentUser(response.data);
                        console.log("goes here");
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

