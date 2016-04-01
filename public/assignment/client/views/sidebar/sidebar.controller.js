
(function(){
    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location){

        var vm = this;


        function init(){

        }
        init();

        vm.$location = $location;



    }
})();