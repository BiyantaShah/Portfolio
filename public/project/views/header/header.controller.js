(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, UserService){

        UserService.setCurrentUser(null);

        //event declarations
        $scope.loggingOut = loggingOut;
        $scope.showHome = showHome;
        $scope.showLogin = showLogin;
        $scope.showLogout = showLogout;
        $scope.showName = showName;
        $scope.showNotesCrud = showNotesCrud;
        $scope.showProposal = showProposal;
        $scope.showRegister = showRegister;
        $scope.showSearch = showSearch;


        //event implementation
        function loggingOut(){
            UserService.setCurrentUser(null);
        }

        function showHome(){
            return true;
        }

        function showLogin(){
            return UserService.getCurrentUser() == null;
        }

        function showLogout(){
            return UserService.getCurrentUser() != null;
        }

        function showName() {
            if (UserService.getCurrentUser() != null) {
                $scope.username = UserService.getCurrentUser().username;
                return true;
            }
        }

        function showNotesCrud(){
            return UserService.getCurrentUser() != null;
        }

        function showProposal(){
            return UserService.getCurrentUser() == null;
        }

        function showRegister(){
            return (UserService.getCurrentUser() == null);
        }

        function showSearch(){
            return UserService.getCurrentUser() != null;
        }


    }
})();
