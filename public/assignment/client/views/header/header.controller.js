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




    }
})();
