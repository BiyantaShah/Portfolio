(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope) {
        var vm = this;

        vm.update = update;

        var currentUser = UserService.getCurrentUser();
        vm.user = currentUser;
        function init() {

        }
        init();

        function update(user){
            var id = currentUser._id;
            console.log(currentUser);
            var userDetails = {
                "_id":id,
                "username":user.username,
                "password": user.password,
                "firstName": user.firstName,
                "lastName":user.lastName,
                "email":user.email
            };
            UserService.updateUser(id,userDetails)
                .then(function(response){
                    if(response.data){

                        UserService.setCurrentUser(response.data);
                        $scope.message ="Profile updated successfully!"
                    }
                    else{
                        $scope.message="Profile not updated!"
                    }


            });
        }
    }
})();