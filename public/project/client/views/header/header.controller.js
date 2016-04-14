(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("HeaderController",HeaderController);

    function HeaderController($scope, UserService, $location){

      var vm =this;

        //event declarations
        vm.logout = logout;

        function init(){

        }
        init();

        //event implementation
        function logout() {
            UserService.logout()
                .then(function(){
                    UserService.setCurrentUser(null);
                    $location.url('/home');
                });


        }




    }
})();
