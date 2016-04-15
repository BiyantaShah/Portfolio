(function(){
    'use strict';
    // service for notes of a particular user

    angular
        .module("NoteTakerWebsite")
        .factory("NoteService", NoteService);

    function NoteService($http, $rootScope){


        var api={
            createNoteForBook:createNoteForBook,
            createNoteForUser:createNoteForUser,
            getAllNotesForBook: getAllNotesForBook,
            getNoteForBook: getNoteForBook,
            getAllNotesForUser:getAllNotesForUser,
            deleteNoteFromBook: deleteNoteFromBook,
            findNoteByTitle: findNoteByTitle,
            findNoteById: findNoteById,
            updateNote:updateNote,
           // updateContent: updateContent,
            getNoteId: getNoteId,
            setNoteId: setNoteId
        }

        return api;

        function createNoteForBook(notebookId, newNote, userId) {
            return $http.post ("/api/project/user/"+userId+"/notebook/" + notebookId+ "/note" ,newNote);


        }

        function createNoteForUser(userId, newNote){
            return $http.post("/api/project/user/"+userId+ "/note", newNote);
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

        function findNoteByTitle(title){

            return $http.get("/api/project/title/" + title);
        }

        function findNoteById(noteId){
            return $http.get("/api/project/note/"+noteId);
        }

        function updateNote(noteId,  note){
            return $http.put("/api/project/note/" + noteId, note);

        }


        function getNoteId(){
            return $rootScope.noteId;
        }

        function setNoteId(noteId){
            $rootScope.noteId = noteId;
        }



    }
})();