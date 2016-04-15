var q = require("q");


module.exports = function(app, NoteService, mongoose) {
    var notes = require("./note.mock.json");

    var NoteSchema = require("./note.schema.server.js")(mongoose);

    var NoteModel = mongoose.model('Project_Note', NoteSchema);

    var api = {

        //for notes
        findAllNotesForBooks: findAllNotesForBooks,
        findNoteById:findNoteById,
        deleteNoteFromBook:deleteNoteFromBook,
        createNoteForBook: createNoteForBook,
        createNoteForUser: createNoteForUser,
        updateNoteByIdForBook:updateNoteByIdForBook,
        //getContent: getContent,
        findNoteByTitle:findNoteByTitle,
        findAllNotesForUsers: findAllNotesForUsers

    };
    return api;


    // note functions

    function findAllNotesForUsers(userId){
        var deferred = q.defer();

        NoteModel.find({userId: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findAllNotesForBooks(notebookId){

        var deferred = q.defer();

        NoteModel.find({notebookId: notebookId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findNoteById(noteId){
        var deferred = q.defer();

        NoteModel.findById(noteId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteNoteFromBook(noteId){

        var deferred = q.defer();

        NoteModel.remove({_id: noteId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

    }

    function createNoteForBook(notebookId,note, userId){

        var deferred = q.defer();
        var newNote = {
            "title": note.title,
            "content": null,
            "notebookId": notebookId,
            "userId": userId
        };

        NoteModel.create(newNote, function (err, doc){

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });


        return deferred.promise;
    }

    function createNoteForUser(userId, note){
        var deferred = q.defer();

        var newNote = {
            "title": note.title,
            "content": null,
            "userId": userId
        };

        NoteModel.create(newNote, function (err, doc){

            if (err) {
                // reject promise if error
                deferred.reject(err);
            } else {
                // resolve promise
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    function updateNoteByIdForBook(noteId, note){

        var deferred = q.defer();

        NoteModel.update(
            { _id : noteId},
            { $set:  {
                "title": note.title,
                "content": note.content
            }

            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });


        return deferred.promise
    }

   /* function getContent(noteId){

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
    }*/

    function findNoteByTitle( title){

        var deferred = q.defer();

        NoteModel.find({title: title}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise
    }
};

