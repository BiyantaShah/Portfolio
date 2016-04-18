(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){

        var vm = this;

        //Event handler declaration
        vm.update = update;




        function init() {
            UserService.getCurrentUser()
                .then(
                    function(response){
                        vm.user = response.data;
                    }
                );
        }
        init();

        //Event handler implementation
        function update(user){
            //var currentUser = UserService.getCurrentUser();
            $scope.message = null;

            if (user.firstName == "") {
                $scope.message = "First Name cannot remain empty";
                return;
            }
            if (user.lastName == "") {
                $scope.message = "Last Name cannot remain empty";
                return;
            }

            if (user.email == "") {
                $scope.message = "Email Name cannot remain empty";
                return;
            }

            if (user.password == "") {
                $scope.message = "Password cannot remain empty";
                return;
            }

            var userDetails = {
                "_id":vm.user._id,
                "username":vm.user.username,
                "email":user.email,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName,
                "type": vm.user.type

            };
            UserService.updateUser(vm.user._id,userDetails)
                .then(function(response){

                    if (response.data){
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                    }
                });

        }
    }

})();