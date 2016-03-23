(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .factory("SubjectService", SubjectService);

    function SubjectService($http,$rootScope){


        var api={
            createSubjectForUser:createSubjectForUser,
            deleteSubjectById:deleteSubjectById,
            getSubjectId: getSubjectId,
            setSubjectId: setSubjectId,
            findSubjectByTitle: findSubjectByTitle,
            findSubjectById: findSubjectById,
            findAllSubjectsForUser: findAllSubjectsForUser,
            updateSubjectById:updateSubjectById
        }

        return api;

        function createSubjectForUser(subject) {
            return $http.post ("/api/assignment/user/" + userId+ "/subject" ,subject);

        }


        function deleteSubjectById(subjectId){

            return $http.delete("/api/project/subject/"+subjectId);
        }

        function getSubjectId(){
            return $rootScope.formId;
        }

        function  setSubjectId(subjectId){
            $rootScope.subjectId = subjectId;
        }

        function findSubjectByTitle(title){
            return $http.get("api/project/subject/"+ title);
        }

        function findSubjectById(subjectId){
            return $http.get("/api/project/subject/"+subjectId);
        }

        function findAllSubjectsForUser(userId){
            return $http.get("/api/project/user/"+ userId +"/subject");
        }

        function updateSubjectById(subjectId, newSubject){

            return $http.put("/api/project/subject/"+ subjectId, newSubject)

        }





    }
})();