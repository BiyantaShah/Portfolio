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
                "username": vm.user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName,
                "email":user.email
            };

            UserService.updateUser(vm.user._id,userDetails)
                .then(function(response){
                    //console.log(response.data);
                    return UserService.findUserByCredentials(user.username,user.password);
                })
                .then(function(response){
                    if (response.data){
                        UserService.setCurrentUser(response.data);
                        UserService.getCurrentUser();
                    }
                });

        }
    }
})();