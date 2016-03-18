(function(){

    'use strict';


    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope,UserService) {


        //var vm = this;

        //event declarations
        $scope.logout = logout;


        function init(){

        }
        init();

        //event implementation
        function logout() {
            UserService.setCurrentUser(null);

        }

       /* function showAdmin() {

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
        }*/


    }
})();
