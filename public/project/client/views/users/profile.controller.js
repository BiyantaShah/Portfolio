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

            var userDetails = {
                "_id":currentUser._id,
                "username":currentUser.username,
                "email":user.email,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName

            };
            UserService.updateUser(vm.user._id,userDetails)
                .then(function(response){

                    if (response.data){
                        UserService.setCurrentUser(response.data);
                        // UserService.getCurrentUser();
                    }
                });

        }
    }

})();