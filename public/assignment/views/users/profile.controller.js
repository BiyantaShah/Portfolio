(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){
        $scope.update = update;

        var store = $rootScope;

        $scope.username = store.username;
        $scope.password = store.password;
        $scope.firstName = store.firstName;
        $scope.lastName = store.lastName;
        $scope.email = store.email;

        function update(username,password,firstName,lastName, email){


                var updateUser = {
                    "_id": store._id,
                    "firstName": firstName,
                    "lastName": lastName,
                    "username": username,
                    "password": password,
                    "roles": store.roles
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