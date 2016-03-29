(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope) {
        var vm = this;

        //Event handler declaration
        vm.update = update;

       /* var currentUser = UserService.getCurrentUser();
        vm.user = currentUser;

        if(currentUser == null){
            $location.path("/home");
        } */

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
           // var currentUser = UserService.getCurrentUser();

            var userDetails = {
                "_id":vm.user._id,
                "username":vm.user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName,
                "email":user.email,
                "roles": vm.user.roles
            };
            UserService.updateUser(currentUser._id,userDetails);
            UserService.setCurrentUser(userDetails);
        }
    }
})();