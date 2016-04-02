(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope) {
        var vm = this;

        //Event handler declaration
        vm.update = update;



        function init() {
            UserService.getCurrentUser()
                .then(
                function(response){
                    vm.user = response.data;
                    vm.user.emails = response.data.emails.join(",");
                }
                );
        }
        init();

        //Event handler implementation
        function update(user){
           // var currentUser = UserService.getCurrentUser();

            var userDetails = {"_id" : vm.user._id,
                "username": vm.user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName,
                "emails":user.emails.split(",")
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