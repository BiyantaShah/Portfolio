(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $location, UserService){

        var vm = this;

        //Event handler declaration
        vm.update = update;

        var currentUser = UserService.getCurrentUser();
        vm.user = currentUser;

        if(currentUser == null){
            $location.path("/home");
        }

        function init() {

        }
        init();

        //Event handler implementation
        function update(user){
            var currentUser = UserService.getCurrentUser();

            var userDetails = {
                "_id":currentUser._id,
                "username":currentUser.username,
                "email":user.email,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName

            };
            UserService.updateUser(currentUser._id,userDetails);
            UserService.setCurrentUser(userDetails);
        }
    }

})();