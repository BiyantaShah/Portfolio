(function(){
    'use strict';

    angular
        .module("NoteTakerWebsite")
        .factory("NoteService", NoteService);

    function NoteService(){

        //initializing array of notes with JSON data

        var notes = [
            {"_id": "000", "title": "Physics", "userId": 123},
            {"_id": "010", "title": "Chemistry", "userId": 123},
            {"_id": "020", "title": "English",   "userId": 123},
            {"_id": "030", "title": "Algorithms","userId": 234},
            {"_id": "040", "title": "PDP",      "userId": 234},
            {"_id": "050", "title": "DB",      "userId": 234},
            {"_id": "060", "title": "MapReduce","userId": 345},
            {"_id": "070", "title": "Data Mining","userId": 345},
            {"_id": "080", "title": "Information Retrieval","userId": 345},
            {"_id": "090", "title": "Geography","userId": 456},
            {"_id": "100", "title": "History","userId": 456}

        ]

        var api={
            createNoteForUser:createNoteForUser,
            findAllNotesForUser: findAllNotesForUser,
            deleteNoteById:deleteNoteById,
            updateNoteById:updateNoteById
        }

        return api;

        function createNoteForUser(userId, note, callback) {
            var newNote; //new note for the user

            note._id = (new Date).getTime();
            note.title = note.title;
            note.userId = userId;

            notes.push(note);
            callback(note);

        }

        function findAllNotesForUser(userId, callback) {
            var userNotes = []; //array containing the notes of the particular user

            for (var i = 0; i < notes.length; i++) {
                if (notes[i].userId == userId) {
                    userNotes.push(notes[i]);
                }
            }
            callback(userNotes);
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