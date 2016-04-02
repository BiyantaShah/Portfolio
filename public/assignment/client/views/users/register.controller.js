(function(){
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location,$scope) {
        var vm = this;

        //Event handler declaration
        vm.register = register;

        function init() {

        }
        init();

        //Event handler implementation

        function register(user) {
            $scope.message = null;

            if (user === null) {
                $scope.message = "The fields cannot be empty";
                return;
            }

            if (user.username === null) {
                $scope.message = "Please Enter your Username";
                return;
            }

            if (user.password === null || user.password2 == null) {
                $scope.message = "Please Enter your Password";
                return;
            }

            if (user.password !== user.password2) {
                $scope.message = "Passwords do not match!";
                return;
            }

            if (user.emails === null) {
                $scope.message = "Please Enter your Email-ID";
                return;
            }

            if (user.password == user.password2){

                var newUser = {
                    //"._id": (new Date).getTime(),
                    "firstName": null,
                    "lastName":null,
                    "username":vm.user.username,
                    "password":vm.user.password,
                    "emails":vm.user.emails.split(","),
                    "roles": []
                };
            }

            UserService.createUser(newUser)
                .then(function(response){

                    UserService.setCurrentUser(response.data);
                    $location.path('/profile');
                });
        }
    }
})();

