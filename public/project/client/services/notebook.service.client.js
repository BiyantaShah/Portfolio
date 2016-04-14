(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .factory("NotebookService", NotebookService);

    function NotebookService($http,$rootScope){

        //initializing array of notes with JSON data


        var api={
            createNotebookForSubject:createNotebookForSubject,
            getAllNotebooksForSubject: getAllNotebooksForSubject,
            getNotebookById: getNotebookById,
            getAllNotebooksForUser: getAllNotebooksForUser,
            deleteNotebookFromSubject: deleteNotebookFromSubject,
            updateNotebook:updateNotebook,
            getNotebookId: getNotebookId,
            setNotebookId: setNotebookId
        }

        return api;

        function createNotebookForSubject(subjectId, newBook) {

            return $http.post ("/api/project/subject/" + subjectId+ "/notebook" ,newBook);


        }

        function getAllNotebooksForSubject(subjectId){
            return $http.get("/api/project/subject/"+ subjectId + "/notebook");
        }

        function getNotebookById(notebookId) {
            return $http.get("/api/project/notebook/" + notebookId);
        }

        function getAllNotebooksForUser(userId){
            return $http.get("/api/project/user/"+ userId + "/notebook");
        }



        function deleteNotebookFromSubject(notebookId){

            return $http.delete("/api/project/notebook/" + notebookId);
        }

        function updateNotebook(notebookId, book){
            return $http.put("/api/project/notebook/" + notebookId, book);

        }

        function getNotebookId(){
            return $rootScope.notebookId;
        }

        function setNotebookId(notebookId){
            $rootScope.notebookId = notebookId;
        }



    }
})();