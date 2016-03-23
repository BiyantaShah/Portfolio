(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .factory("NotebookService", NotebookService);

    function NotebookService($http){

        //initializing array of notes with JSON data


        var api={
            createNotebookForSubject:createNotebookForSubject,
            getAllNotebooksForSubject: getAllNotebooksForSubject,
            getNotebookForSubject: getNotebookForSubject,
            deleteNotebookFromSubject: deleteNotebookFromSubject,
            updateNotebook:updateNotebook
        }

        return api;

        function createNotebookForSubject(subjectId, newBook) {

            return $http.post ("/api/project/subject/" + subjectId+ "/notebook" ,newBook);


        }

        function getAllNotebooksForSubject(subjectId){
            return $http.get("/api/project/subject/"+ subjectId + "/notebook");
        }

        function getNotebookForSubject(subjectId, notebookId) {
            return $http.get("/api/project/subject/"+ subjectId +"/notebook/" + notebookId);
        }



        function deleteNotebookFromSubject(subjectId, notebookId){

            return $http.delete("/api/project/subject/" + subjectId + "/notebook/" + notebookId);
        }

        function updateNotebook(subjectId, notebookId, book){
            return $http.put("/api/project/subject/"+ subjectId + "/notebook/" + notebookId, book);

        }



    }
})();