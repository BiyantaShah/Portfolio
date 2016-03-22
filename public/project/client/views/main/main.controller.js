(function(){

    angular
        .module("NoteTakerWebsite")
        .controller("MainController", MainController);

    function MainController($scope, $location){
        $scope.$location = $location;
    }

})();
