(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location,$scope) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            $scope.message = null;

            if(user === null){
                $scope.message="The fields cannot be empty";
                return;
            }

            if(user.username === null){
                $scope.message="Please Enter your Username";
                return;
            }

            if(user.password === null || user.password2 == null){
                $scope.message = "Please Enter your Password";
                return;
            }

            if(user.password !== user.password2){
                $scope.message = "Passwords do not match!";
                return;
            }

            if(user.email=== null){
                $scope.message = "Please Enter your Email-ID";
                return;
            }


            UserService.createUser(user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $scope.message="You are successfully registered";
                        $location.url("/profile");
                    }
                    else{
                        $scope.message = "Sorry, Try Again!";
                    }
                });
        }
    }
})();

/*(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope,UserService, $location){

        //event declaration
        $scope.register = register;

        //event implementation
        function register(username,password,verifyPassword, email) {

            if(password == verifyPassword) {
                var newUser = {
                    "_id": (new Date).getTime(),
                    "firstName": null,
                    "lastName": null,
                    "username": username,
                    "password": password,
                    "roles": []
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

})(); */