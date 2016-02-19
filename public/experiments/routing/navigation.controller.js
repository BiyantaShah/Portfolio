/**
 * Created by Biyanta on 19/02/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("NavController",NavController);

    function NavController($location, $scope){
        $scope.$location = $location;  // Hey scope I am binding you to a particular location


    }

})();
