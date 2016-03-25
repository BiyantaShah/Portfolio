(function(){
    'use strict';
    // dummy functionality
    // for displaying CRUD
    angular
        .module("NoteTakerWebsite")
        .factory("NoteCrudService", NoteCrudService);

    function NoteCrudService(){

        //initializing array of notes with JSON data

        var notes = [
            {"_id": "000", "title": ["Physics", "Chemistry", "English"], "userId": 123, "username":"alice"},
            {"_id": "030", "title": ["Algorithms", "DB","PDP"],"userId": 234, "username":"bob"},
            {"_id": "060", "title": ["MapReduce","Data Mining", "Information Retrieval"],"userId": 345, "username":"dan"},
            {"_id": "090", "title": ["Geography","History"],"userId": 456, "username":"charlie"},

        ]

        var api={
            createNoteForUser:createNoteForUser,
            findAllNotesForUser: findAllNotesForUser,
            deleteNoteById:deleteNoteById,
            updateNoteById:updateNoteById
        }

        return api;

        function createNoteForUser( note, callback) {
            notes.push(note);
            callback(note);

        }

        function findAllNotesForUser (callback) {
            callback(notes);
        }

        function deleteNoteById(noteId, callback){

            for (var i = 0; i < notes.length; i++) {
                if (notes[i]._id == noteId) {
                    notes.splice(i,1);
                    break;
                }
            }
            callback(notes);
        }

        function updateNoteById(noteId, newNote, callback){

            for (var i = 0; i < notes.length; i++) {
                if (notes[i]._id == noteId) {
                    notes[i].title =newNote.title;
                    notes[i].userId = newNote.userId;
                    break;
                }
            }

            callback(notes[i]);

        }





    }
})();