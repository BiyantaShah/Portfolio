(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .factory("GroupService", GroupService);

    function GroupService($http, $rootScope){

        var api={
            createGroupForUser:createGroupForUser,
            deleteGroupById:deleteGroupById,
            getGroupId: getGroupId,
            setGroupId: setGroupId,
            findGroupByTitle: findGroupByTitle,
            findGroupById: findGroupById,
            findAllGroupsForUser: findAllGroupsForUser,
            updateGroupById:updateGroupById,
            updateMembers:updateMembers,
            updateNotes:updateNotes
        }

        return api;

        function createGroupForUser(userId, group) {

            return $http.post ("/api/project/user/" + userId+ "/group" ,group);

        }


        function deleteGroupById(groupId){

            return $http.delete("/api/project/group/"+groupId);
        }


        function getGroupId(){
            return $rootScope.groupId;
        }

        function  setGroupId(groupId){
            $rootScope.groupId = groupId;
        }

        function findGroupByTitle(title){
            return $http.get("api/project/group/"+ title);
        }

        function findGroupById(groupId){
            return $http.get("/api/project/group/"+groupId);
        }

        function findAllGroupsForUser(userId){
            return $http.get("/api/project/user/"+ userId +"/group");
        }

        function updateGroupById(groupId, newGroup){

            return $http.put("/api/project/group/"+ groupId, newGroup)

        }

        function updateMembers(username, group){
            return $http.put("/api/project/user/"+username +"/group", group);
        }

        function updateNotes(group){
            return $http.put("/api/project/group", group)
        }


    }
})();