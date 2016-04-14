(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .factory("CheckListService", CheckListService);

    function CheckListService($http,$rootScope){


        var api={
            createCheckListForUser:createCheckListForUser,
            deleteCheckListById:deleteCheckListById,
            getChecklistId: getChecklistId,
            setCheckListId: setCheckListId,
            findCheckListByTitle: findCheckListByTitle,
            findCheckListById: findCheckListById,
            findAllCheckListsForUser: findAllCheckListsForUser,
            updateCheckListById:updateCheckListById
        }

        return api;

        function createCheckListForUser(userId, checklist) {
            return $http.post ("/api/project/user/" + userId+ "/checklist" ,checklist);

        }


        function deleteCheckListById(checklistId){

            return $http.delete("/api/project/checklist/"+ checklistId);

        }

        function getChecklistId(){
            return $rootScope.checklistId;
        }

        function  setCheckListId(checklistId){
            $rootScope.checklistId = checklistId;
        }

        function findCheckListByTitle(userId, title){
            return $http.get("api/project/checklist/"+ title);
        }

        function findCheckListById(checklistId){
            return $http.get("/api/project/checklist/"+checklistId);
        }

        function findAllCheckListsForUser(userId){
            return $http.get("/api/project/user/"+ userId +"/checklist");
        }

        function updateCheckListById(checklistId, newChecklist){

            return $http.put("/api/project/checklist/"+ checklistId, newChecklist)

        }





    }
})();