(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("GroupController",GroupController);

    function GroupController($scope, GroupCrudService) {

        var currentAllUserGroups= []; //Notes of the current user
        var currentNotes = null; //Current user is stored
        var selectedGroupIndex = -1; //the index of the Note selected

        currentNotes = GroupCrudService.findAllGroupForUser(renderAllGroups);


        //event declarations
        $scope.addGroup = addGroup;
        $scope.deleteGroup = deleteGroup;
        $scope.selectGroup = selectGroup;
        $scope.updateGroup = updateGroup;


        //event implementations

        function addGroup(groupName,username) {

            if (groupName != null && username != []) {
                var newGroup = {
                    "_id": null,
                    "name": groupName,
                    "users": username.split(",")
                };

                GroupCrudService.createGroupForUser(newGroup, renderAdd);
            }
        }

        function deleteGroup(index) {
            GroupCrudService.deleteGroupById(currentAllUserGroups[index]._id, renderDelete);
        }



        function selectGroup(index) {
            selectedGroupIndex = index;
            var selectGroup = currentAllUserGroups[index];
            $scope.groupName = selectGroup.name ;
            $scope.username = selectGroup.users;

        }


        function updateGroup(groupName,username) {
            if(selectedGroupIndex != -1){
                var selectedGroup = currentAllUserGroups[selectedGroupIndex];
                selectedGroup.name = groupName;
                selectedGroup.users = username.split(",");
                GroupCrudService.updateGroupById(selectedGroup._id, selectedGroup, renderUpdate);

                $scope.groupName = null;
                $scope.username = null;
            }
        }

        function renderAllGroups(userGroup) {
            console.log(userGroup);
            $scope.groups = userGroup;
            currentAllUserGroups = userGroup;
        }

        function renderAdd(newGroup) {
            $scope.groupName = null;
            $scope.username = null;
            $scope.groups = currentAllUserGroups;

        }

        function renderDelete(allGroups) {
            GroupCrudService.findAllGroupForUser(renderAllGroups);

        }

        function renderUpdate(newGroup) {
            GroupCrudService.findAllGroupForUser(renderAllGroups);
            selectedGroupIndex = -1;
        }


    }
})();

