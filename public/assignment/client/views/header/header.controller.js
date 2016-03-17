(function(){

    'use strict';


    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService) {

        UserService.setCurrentUser(null);

        var  vm = this;

        //event declarations
        vm.logout = logout;
        vm.showAdmin = showAdmin;
        vm.showLogout = showLogout;
        vm.showLogin = showLogin;
        vm.showName = showName;
        vm.showRegister = showRegister;

        function init(){

        }
        init();

        //event implementation
        function logout() {
            UserService
                .logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url("/home");
                });
        }

        function showAdmin() {

            if (UserService.getCurrentUser() != null) {
                for (var i = 0; i < UserService.getCurrentUser().roles.length; i++) {
                    if(UserService.getCurrentUser().roles[i] == "admin")
                    {return true;}

                }
            }
        }

        function showLogin() {
            return UserService.getCurrentUser() == null;
        }

        function showLogout() {
            return UserService.getCurrentUser() != null;
        }

        function showName() {
            if (UserService.getCurrentUser() != null) {
                $scope.username = UserService.getCurrentUser().username;
                return true;
            }
        }

        function showRegister() {
            return (UserService.getCurrentUser() == null);
        }


    }
})();
