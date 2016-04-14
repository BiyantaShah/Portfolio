var q = require("q");


module.exports = function(app, NotebookService) {
    var notebooks = require("./notebook.mock.json");
    var api = {
        // for notebook
        findAllNotebooksForSubject: findAllNotebooksForSubject,
        findNotebookById: findNotebookById,
        deleteNotebookFromSubject: deleteNotebookFromSubject,
        createNotebookForSubject: createNotebookForSubject,
        updateNotebookByIdForSubject: updateNotebookByIdForSubject

    };
    return api;


    //functions for notebook

    function findAllNotebooksForSubject(subjectId){

        var deferred = q.defer();
        var notebook =[];

        for(var i in notebooks){
            if(notebooks[i].subjectId == subjectId) {
                notebook.push(notebooks[i]);
            }
        }

        deferred.resolve(notebook);
        return deferred.promise;
    }

    function findNotebookById(notebookId){
        var deferred = q.defer();
        var bookSelect = null;



        for(var i in notebooks){
            if(notebooks._id == notebookId){
                bookSelect = notebooks[i];
                break;
            }
        }

        deferred.resolve(bookSelect);
        return deferred.promise;
    }


    function deleteNotebookFromSubject(notebookId){

        var deferred = q.defer();

        for(var i in notebooks){
            if(notebooks[i]._id == notebookId){
                notebooks.splice(i,1);
            }
        }
        deferred.resolve(notebooks);
        return deferred.promise;

    }

    function createNotebookForSubject(subjectId,newBook){

        var deferred = q.defer();


        newBook._id=(new Date).getTime();
        newBook.subjectId = subjectId;

        notebooks.push(newBook);

        deferred.resolve(notebooks);
        return deferred.promise;

    }

    function updateNotebookByIdForSubject(notebookId,book){

        var deferred = q.defer();


        for(var i in notebooks){
            if(notebooks[i]._id == notebookId){
                notebooks[i] = book;
                break;
            }
        }

        deferred.resolve(book);
        return deferred.promise

    }


};
