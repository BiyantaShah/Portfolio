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
                vm.message = "Please enter your Login Details!";
                return $scope.message;
            }


            UserService
                .login({
                    username: user.username,
                    password: user.password

                })
                .then(function (response) {

                    if(response.data){

                        UserService.setCurrentUser(response.data);
                        $location.path('/profile');
                    }

                },
                    function(err){
                        vm.message = "Invalid Credentials";
                        return;
                    }
                );

        }



    }

})();

