var q = require("q");


module.exports = function(app, NotebookService, mongoose) {
    var notebooks = require("./notebook.mock.json");

    var NotebookSchema = require("./notebook.schema.server.js")(mongoose);

    var NotebookModel = mongoose.model('Project_Notebook', NotebookSchema);

    var api = {
        // for notebook
        findAllNotebooksForSubject: findAllNotebooksForSubject,
        findNotebookById: findNotebookById,
        findAllNotebooksForUser:findAllNotebooksForUser,
        deleteNotebookFromSubject: deleteNotebookFromSubject,
        createNotebookForSubject: createNotebookForSubject,
        createNotebookForUser: createNotebookForUser,
        updateNotebookByIdForSubject: updateNotebookByIdForSubject

    };
    return api;


    //functions for notebook

    function findAllNotebooksForSubject(subjectId){

        var deferred = q.defer();

        NotebookModel.find({subjectId: subjectId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findNotebookById(notebookId){
        var deferred = q.defer();

        NotebookModel.findById(notebookId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllNotebooksForUser(userId){
        var deferred = q.defer();

        NotebookModel.find({userId: userId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }


    function deleteNotebookFromSubject(notebookId){

        var deferred = q.defer();

        NotebookModel.remove({_id: notebookId},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

    }

    function createNotebookForSubject(subjectId,Book, userId){

        var deferred = q.defer();
        var newBook = {
            "label": Book.label,
            "userId": userId,
            "subjectId": subjectId
        };

        NotebookModel.create(newBook, function (err, doc){

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

    function createNotebookForUser(userId, Book){
        var deferred = q.defer();

        var newBook = {
            "label": Book.label,
            "userId": userId
        };

        NotebookModel.create(newBook, function (err, doc){

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

    function updateNotebookByIdForSubject(notebookId,book){

        var deferred = q.defer();

        NotebookModel.update(
            { _id : notebookId},
            { $set:  {
                "label": book.label
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


};
