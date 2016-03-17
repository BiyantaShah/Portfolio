(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location) {
        var vm = this;

        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            UserService.createUser(user)
                .then(function(response){
                    var currentUser = response.data;
                    if(currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile");
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