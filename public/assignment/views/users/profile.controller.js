(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){
        $scope.update = update;

        var store = $rootScope;

        $scope.username = $rootScope.username;
        $scope.password = $rootScope.password;
        $scope.firstName = $rootScope.firstName;
        $scope.lastName = $rootScope.lastName;
        $scope.email = $rootScope.email;

        function update(username,password,firstName,lastName, email){


                var updateUser = {
                    "_id": $rootScope._id,
                    "firstName": firstName,
                    "lastName": lastName,
                    "username": username,
                    "password": password,
                    "roles": $rootScope.roles
                }


            UserService.updateUser(store._id, updateUser, render)



        }

        function render(updateUser){
            if(updateUser!=null){
                $rootScope = updateUser;
                $location.path('/profile');
            }

        }
    }

})();