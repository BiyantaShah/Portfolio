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
            vm.message = null;

            if (user.firstName == "") {
                vm.message = "Please do not keep First Name empty";
                return;
            }
            if (user.lastName == "") {
                vm.message = "Please do not keep Last Name empty";
                return;
            }

            if (user.email == "") {
                vm.message = "Please do not keep Email ID empty";
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