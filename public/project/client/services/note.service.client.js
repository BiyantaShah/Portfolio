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
            getAllNotesForUser:getAllNotesForUser,
            deleteNoteFromBook: deleteNoteFromBook,
            findNoteByTitle: findNoteByTitle,
            updateNote:updateNote,
            getContent: getContent,
            getNoteId: getNoteId,
            setNoteId: setNoteId
        }

        return api;

        function createNoteForBook(notebookId, newNote) {
            return $http.post ("/api/project/notebook/" + notebookId+ "/note" ,newNote);


        }

        function getAllNotesForBook( notebookId){
            return $http.get("/api/project/notebook/"+ notebookId + "/note");
        }

        function getNoteForBook( noteId) {
            return $http.get("/api/project/note/" + noteId);
        }

        function getAllNotesForUser(userId){
            return $http.get("/api/project/user/"+ userId +"/note");
        }



        function deleteNoteFromBook(  noteId){

            return $http.delete("/api/project/note/" + noteId);
        }

        function findNoteByTitle(userId, title){

            return $http.get("/api/project/user/" + userId + "/title/" + title);
        }

        function updateNote(noteId,  note){
            return $http.put("/api/project/note/" + noteId, note);

        }

        function getContent(noteId){
            return $http.get("/api/project/note/" + noteId + '/content');
        }

        function getNoteId(){
            return $rootScope.noteId;
        }

        function setNoteId(noteId){
            $rootScope.noteId = noteId;
        }



    }
})();