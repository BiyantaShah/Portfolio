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
        $scope.loggingOut = loggingOut;



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
                    {return true;}

                }

            }

        }

        function showName(){
            if ($rootScope !=null){
                $scope.username = $rootScope.username;
                return true;
            }
        }

        function loggingOut(){
            $rootScope = null;
        }

        function showLogout(){
         return $rootScope!=null;
        }
    }
})();
