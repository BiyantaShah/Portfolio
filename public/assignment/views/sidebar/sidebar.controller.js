/**
 * Created by Biyanta on 19/02/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope){
        $scope.showHome = showHome;
        $scope.showProfile = showProfile;
        $scope.showForms = showForms;
        $scope.showAdmin = showAdmin;

        $rootScope = null;

        function showHome(){
            return true;
        }

        function showProfile(){
            return $rootScope!=null;
        }

        function showForms(){
            return $rootScope!=null;
        }

        function showAdmin(){
            if($rootScope !=null){
                for(var i=0; i < $rootScope.roles.length;i++){
                    if($rootScope.roles[i]== "admin")
                    {return true;}
                }
            }

        }
    }
})();