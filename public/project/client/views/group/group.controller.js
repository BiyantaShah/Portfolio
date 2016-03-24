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

        function init(){

            if (UserService.getCurrentUser() == null) {
                $location.path("/home");
            }
            else{
                currentUser =UserService.getCurrentUser();

                GroupService.findAllGroupsForUser(currentUser._id)
                    .then(function(response){
                        vm.groups = response.data;
                        currentAllUserGroups = response.data;
                    });
            }

        }
        init();




        //event implementations

        function addGroup(groupName,member) {


            if (groupName != null && member != []) {
                var newGroup = {
                    "_id": null,
                    "title": groupName,
                    "users":[],
                    "members": member.split(",")
                };

                GroupService.createGroupForUser(UserService.getCurrentUser()._id, newGroup)
                    .then(function(response){
                        console.log(response.data);

                        init();
                        vm.group.groupName = null;
                        vm.group.member = null;

                    });
            }
        }

        function deleteGroup(index) {
            GroupService.deleteGroupById(vm.groups[index]._id);
            init();
        }



        function selectGroup(index) {

            vm.index = index;
            vm.group = vm.groups[index];
            vm.group.groupName = vm.groups[index].title;
            vm.group.member = vm.groups[index].members;

        }


        function updateGroup(groupName,member) {
            if(vm.index != -1 && groupName != null && member != []){

                var selectedGroup = vm.groups[vm.index];
                selectedGroup.title = groupName;
                selectedGroup.members = member.split(",");
                GroupService.updateGroupById(selectedGroup._id, selectedGroup);
                init();
                vm.index = -1;
                vm.group.groupName = null;
                vm.group.member = null;
            }

        }



    }
})();

