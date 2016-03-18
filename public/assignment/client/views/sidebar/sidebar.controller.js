
(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location){

        /*UserService.setCurrentUser(null);

        var vm = this;

        //event declarations
        vm.showAdmin = showAdmin;
        vm.showForms = showForms;
        vm.showHome = showHome;
        vm.showProfile = showProfile;

        function init(){

        }
        init();*/

        $scope.$location = $location;

        //event implementation
       /* function showAdmin() {
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
        }*/

    }
})();