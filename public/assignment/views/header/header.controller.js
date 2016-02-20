(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope){

        $scope.showRegister = showRegister;
        $scope.showLogin = showLogin;
        $scope.showAdmin = showAdmin;
        $scope.showName = showName;
        $scope.showLogout = showLogout;


        $rootScope = null;

        function showRegister(){
            return $rootScope == null;
        }

        function showLogin(){
            return $rootScope == null;
        }

        function showAdmin(){
            if($rootScope !=null){
                for(var i=0; i < $rootScope.roles.length;i++){
                    if($rootScope.roles[i]== "admin")
                    {break;}

                }
                return true;
            }

        }

        function showName(){
            return $rootScope !=null;
        }

        function showLogout(){
         return $rootScope !=null;
        }
    }
})();
