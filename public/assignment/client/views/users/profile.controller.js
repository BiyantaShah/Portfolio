(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope) {
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
                "username":user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName,
                "email":user.email
            };
            UserService.updateUser(currentUser._id,userDetails);
            UserService.setCurrentUser(userDetails);
        }
    }
})();