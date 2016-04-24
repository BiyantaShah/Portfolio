(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("GroupController",GroupController);

    function GroupController($scope, GroupService, $location, UserService) {

        var vm = this;

        var currentAllUserGroups= []; //Groups of the current user
        var currentUser = null; //Current user is stored


        //event declarations
        vm.addGroup = addGroup;
        vm.deleteGroup = deleteGroup;
        vm.selectGroup = selectGroup;
        vm.updateGroup = updateGroup;
        vm.groupDetails =groupDetails;


        function init() {


            UserService.getCurrentUser()
                .then(function (response) {
                    vm.user = response.data;

                    if (vm.user == null) {
                        $location.path("/home");
                    }
                    else {
                        GroupService.findAllGroupsForUser(vm.user.username)
                            .then(function (response) {
                                vm.groups = response.data;
                                //currentAllUserGroups = response.data;
                            });
                    }

                });
        }
        init();




        //event implementations

        function addGroup(groupName) {

            $scope.message = null;

            if(groupName == null || groupName == ""){
                $scope.message = "Please fill in the group name";
                return $scope.message;
            }

            if (groupName != null) {
                var newGroup = {
                   // "_id": null,
                    "title": groupName,
                    "members": vm.user.username,
                    "shared":[],
                    "createdBy": vm.user._id
                };

                GroupService.createGroupForUser(vm.user._id, newGroup)
                    .then(function(response){
                        init();
                        vm.group.groupName = null;
                        //vm.group.member = vm.user.username;

                    });
            }
        }

        function deleteGroup(index) {
            GroupService.deleteGroupById(vm.groups[index]._id)
            .then(function(response){
                if(response.data){
                    init();
                }
            });
        }



        function selectGroup(index) {

            vm.index = index;
            vm.group = vm.groups[index];
            vm.group.groupName = vm.groups[index].title;
            vm.group.member = vm.groups[index].members;

        }


        function updateGroup(groupName) {

            $scope.message = null;

            if(groupName == ""){
                $scope.message = "Please fill in the group name";
                return;
            }


            if(vm.index != -1 && groupName != null){

                var selectedGroup = vm.groups[vm.index];
                var updateGroup = {
                    "_id":selectedGroup._id,
                    "title": groupName,
                    "members": selectedGroup.members,
                    "shared": selectedGroup.shared,
                    "createdBy": vm.user._id
                };

                GroupService.updateGroupById(selectedGroup._id, updateGroup)
                    .then(function(response){
                        if(response.data){
                            vm.groups[vm.index] = response.data;
                            vm.group.groupName = null;
                            //vm.group.member = vm.user.username;
                            vm.index = -1;
                            init();
                        }
                    });



            }

        }

        function groupDetails(groupId){
            GroupService.setGroupId(groupId);
            $location.path("/group/" + groupId + "/details");
        }





    }
})();

