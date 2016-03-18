(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $scope, $rootScope) {
        var vm = this;

        vm.update = update;

        var currentUser = $rootScope.currentUser;
        vm.username = currentUser.username;
        vm.firstName = currentUser.firstName;
        vm.lastName = currentUser.lastName;
        vm.password = currentUser.password;
        vm.email = currentUser.email;

        alert(currentUser);

        function init() {

        }
        return init();

        function update(username,password,firstName,lastName, email){
            var id = currentUser._id;
            var userDetails = {
                "_id":id,
                "username":username,
                "password": password,
                "firstName": firstName,
                "lastName":lastName,
                "email":email
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