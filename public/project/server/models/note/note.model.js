var q = require("q");


module.exports = function(app, NoteService, mongoose) {
    var notes = require("./note.mock.json");

    var NoteSchema = require("./note.schema.server.js")(mongoose);

    var NoteModel = mongoose.model('Project_Note', NoteSchema);

    var api = {

        //for notes
        addItem:addItem,
        delItem:delItem,
        findAllNotesForBooks: findAllNotesForBooks,
        findNoteById:findNoteById,
        findByTitle: findByTitle,
        deleteNoteFromBook:deleteNoteFromBook,
        createNoteForBook: createNoteForBook,
        createNoteForUser: createNoteForUser,
        updateNoteByIdForBook:updateNoteByIdForBook,
        findNoteByTitle:findNoteByTitle,
        findAllNotesForUsers: findAllNotesForUsers,
        searchNote : searchNote

    };
    return api;


    // note functions

    function addItem(noteId, newField){

        var deferred = q.defer();



            NoteModel.update(
                { _id : noteId},
                { $set:  {
                    "content": newField
                }

                }, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });


        return deferred.promise;


    }


    function delItem(noteId){

        var deferred = q.defer();



        NoteModel.update(
            { _id : noteId},
            { $set:  {
                "content": ""
            }

            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });


        return deferred.promise;


    }




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

    function findByTitle(title){

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
            "content": "",
            "notebookId": notebookId,
            "userId": userId,
            "type":note.type,
            "reminder": null
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
            "content": "",
            "userId": userId,
            "type":note.type,
            "reminder": null
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
                "content": note.content,
                "reminder": note.reminder
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


    function findNoteByTitle( userId, title){

        var deferred = q.defer();

        NoteModel.find({ $and: [{userId: userId},{title: title}]}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise
    }

    function searchNote(title,userId){

        return NoteModel.find({$or: [{'title': {$regex: title, $options: 'i'}}, {'content': {$regex: title, $options: 'i'}}]});

        //return NoteModel.find({$or: [{$and: [{'content': {$regex: title, $options: 'i'}},{userId: userId}]},
        //{ $and: [{'title': {$regex: title, $options: 'i'}},{userId: userId}]}]});
    }
};

