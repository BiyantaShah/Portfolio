(function(){
    'use strict';
    // service for notes of a particular user

    angular
        .module("NoteTakerWebsite")
        .factory("NoteService", NoteService);

    function NoteService($http, $rootScope){


        var api={
            addItem: addItem,
            createNoteForBook:createNoteForBook,
            createNoteForUser:createNoteForUser,
            getAllNotesForBook: getAllNotesForBook,
            getNoteForBook: getNoteForBook,
            getAllNotesForUser:getAllNotesForUser,
            deleteNoteFromBook: deleteNoteFromBook,
            findNoteByTitle: findNoteByTitle,
            findByTitle:findByTitle,
            findNoteById: findNoteById,
            updateNote:updateNote,
            searchNote: searchNote,
            getNoteId: getNoteId,
            setNoteId: setNoteId

        }

        return api;

        function addItem(noteId, newField){
            return $http.put("/api/project/note/"+ noteId + "/content/" + newField);
        }

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

        function findNoteByTitle(userId, title){

            return $http.get("/api/project/user/" + userId +"/title/" + title);
        }

        function findNoteById(noteId){
            return $http.get("/api/project/note/"+noteId);
        }

        function updateNote(noteId,  note){
            return $http.put("/api/project/note/" + noteId, note);

        }

        function findByTitle(title){
            return $http.get("/api/project/title/" +title);
        }

        function searchNote(title){
            return $http.get("/api/project/search/" + title)
        }


        function getNoteId(){
            return $rootScope.noteId;
        }

        function setNoteId(noteId){
            $rootScope.noteId = noteId;
        }



    }
})();