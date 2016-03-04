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
            {"_id": "000", "title": "Physics", "userId": 123, "username":"alice"},
            {"_id": "010", "title": "Chemistry", "userId": 123, "username":"alice"},
            {"_id": "020", "title": "English",   "userId": 123, "username":"alice"},
            {"_id": "030", "title": "Algorithms","userId": 234, "username":"bob"},
            {"_id": "040", "title": "PDP",      "userId": 234, "username":"bob"},
            {"_id": "050", "title": "DB",      "userId": 234, "username":"bob"},
            {"_id": "060", "title": "MapReduce","userId": 345, "username":"dan"},
            {"_id": "070", "title": "Data Mining","userId": 345, "username":"dan"},
            {"_id": "080", "title": "Information Retrieval","userId": 345, "username":"dan"},
            {"_id": "090", "title": "Geography","userId": 456, "username":"charlie"},
            {"_id": "100", "title": "History","userId": 456, "username":"charlie"}

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