(function(){
    'use strict';
    // service for notes of a particular user

    angular
        .module("NoteTakerWebsite")
        .factory("NoteService", NoteService);

    function NoteService($http, $rootScope){


        var api={
            createNoteForBook:createNoteForBook,
            getAllNotesForBook: getAllNotesForBook,
            getNoteForBook: getNoteForBook,
            deleteNoteFromBook: deleteNoteFromBook,
            findNoteByTitle: findNoteByTitle,
            updateNote:updateNote,
            getContent: getContent,
            getNoteId: getNoteId,
            setNoteId: setNoteId
        }

        return api;

        function createNoteForBook(subjectId,notebookId, newNote) {
            return $http.post ("/api/project/subject/"+ subjectId +"/notebook/" + notebookId+ "/note" ,newNote);


        }

        function getAllNotesForBook( notebookId,subjectId){
            return $http.get("/api/project/subject/"+ subjectId +"/notebook/"+ notebookId + "/note");
        }

        function getNoteForBook(subjectId,notebookId, noteId) {
            return $http.get("/api/project/subject/"+subjectId+"/notebook/"+ notebookId +"/note/" + noteId);
        }



        function deleteNoteFromBook( subjectId,notebookId, noteId){

            return $http.delete("/api/project/subject/" + subjectId+"/notebook/" + notebookId + "/note/" + noteId);
        }

        function findNoteByTitle(userId, title){

            return $http.get("/api/project/user/" + userId + "/title/" + title);
        }

        function updateNote(subjectId, notebookId,noteId,  note){
            return $http.put("/api/project/subject/"+ subjectId +"/notebook/"+ notebookId + "/note/" + noteId, note);

        }

        function getContent(subjectId,notebookId, noteId){
            return $http.get("/api/project/subject/" + subjectId +"/notebook/" + notebookId + "/note/" + noteId + '/content');
        }

        function getNoteId(){
            return $rootScope.noteId;
        }

        function setNoteId(noteId){
            $rootScope.noteId = noteId;
        }



    }
})();