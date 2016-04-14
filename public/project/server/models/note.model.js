var q = require("q");


module.exports = function(app, NoteService) {
    var notes = require("./note.mock.json");
    var api = {

        //for notes
        findAllNotesForBooks: findAllNotesForBooks,
        findNoteById:findNoteById,
        deleteNoteFromBook:deleteNoteFromBook,
        createNoteForBook: createNoteForBook,
        updateNoteByIdForBook:updateNoteByIdForBook,
        getContent: getContent,
        findNoteByTitle:findNoteByTitle

    };
    return api;


    // note functions

    function findAllNotesForBooks(notebookId){

        var deferred = q.defer();
        var note = [];

        for (var i in notes){
            if(notes[i].notebookId == notebookId){
                note.push(notes[i]);
            }
        }

        deferred.resolve(note);
        return deferred.promise;
    }

    function findNoteById(noteId){
        var deferred = q.defer();

        var note = null;

        for (var i in notes){
            if(notes[i]._id == noteId){
                note = notes[i];
                break;
            }
        }


        deferred.resolve(note);
        return deferred.promise;
    }

    function deleteNoteFromBook(noteId){

        var deferred = q.defer();

        for(var i in notes){
            if(notes[i]._id == noteId){
                notes.splice(i,1);
            }
        }

        deferred.resolve(notes);
        return deferred.promise;

    }

    function createNoteForBook(notebookId,newNote){

        var deferred = q.defer();


        newNote._id=(new Date).getTime();
        newNote.notebookId = notebookId;

        notes.push(newNote);

        deferred.resolve(notes);
        return deferred.promise;

    }

    function updateNoteByIdForBook(noteId, note){

        var deferred = q.defer();


        for(var i in notes){
            if(notes[i]._id == noteId){
               notes[i] = note;
                break;
            }
        }

        deferred.resolve(note);
        return deferred.promise;
    }

    function getContent(noteId){

        var deferred = q.defer();

        var note = null;


        for(var i in notes){
            if(notes[i]._id == noteId){
                note = notes[i];
                break;
            }
        }


        deferred.resolve(note);
        return deferred.promise
    }

    function findNoteByTitle(userId, title){
        var deferred = q.defer();

        var note = [];
        var finalNote = null;
        var Id1,Id2;

        for(var a in notes){
            if(notes[a].userId == userId){
                note.push(notes[a]);
            }
        }


        for(var i in note) {
            if(note[i].title = title){
                finalNote = note[i];
                break;
            }

        }

       // var abcd = {"note" :finalNote, "subjectId": Id1, "notebookId": Id2 };
        deferred.resolve(finalNote);
        return deferred.promise
    }
};

