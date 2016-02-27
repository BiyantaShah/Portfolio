
(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, UserService){

        UserService.setCurrentUser(null);

        //event declarations
        $scope.showAdmin = showAdmin;
        $scope.showForms = showForms;
        $scope.showHome = showHome;
        $scope.showProfile = showProfile;



        //event implementation
        function showAdmin() {
            if (UserService.getCurrentUser() != null) {
                for(var i = 0; i < UserService.getCurrentUser().roles.length; i++) {
                    if (UserService.getCurrentUser().roles[i] == "admin") {
                        return true;
                    }
                }
            }

        }

        function showForms() {
            return UserService.getCurrentUser()!=null;
        }

        function showHome() {
            return true;
        }

        function showProfile() {
            return UserService.getCurrentUser()!=null;
        }

    }
})();