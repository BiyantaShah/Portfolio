(function(){
    "use strict";
    angular
        .module("NoteTakerWebsite")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService) {

        var vm = this;


        vm.createUser = createUser;
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.updateUser = updateUser;

        vm.index = -1;



        function init(){
            UserService
                .findAllUsersAdmin()
                .then(function (res){
                    vm.users = res.data;

                });
        }
        init();


        function createUser(newUser){
            UserService
                .createUser(newUser)
                .then(function (doc) {
                    vm.user = null;
                    init();
                });
        }


        function selectUser(index) {
            vm.index = index;

            vm.user = {
                "_id": vm.users[index]._id,
                "firstName": vm.users[index].firstName,
                "lastName": vm.users[index].lastName,
                "username": vm.users[index].username,
                "password": "",
                "email": vm.users[index].email,
                "type": vm.users[index].type
            };
        }


        function deleteUser(index){
            UserService
                .deleteUserById(vm.users[index]._id)
                .then(function(res){
                    init();
                });
        }


        function updateUser(user){
            if(vm.index != -1)
            {
                UserService
                    .updateUserByAdmin(user._id, user)
                    .then(function(res){
                        init();
                        vm.index = -1;
                        vm.user = null;
                    });
            }
        }




    }
})();