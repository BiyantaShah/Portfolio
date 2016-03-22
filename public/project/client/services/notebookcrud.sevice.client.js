(function(){
    'use strict';
    // dummy functionality
    // for displaying CRUD
    angular
        .module("NoteTakerWebsite")
        .factory("NotebookCrudService", NotebookCrudService);

    function NotebookCrudService(){

        //initializing array of notes with JSON data

        var notebooks = [
            {"_id": "000", "title": "Physics", "notes":["Motion", "Force"]},
            {"_id": "010", "title": "Chemistry", "notes":["Organic Chemistry", "Solutions"]},
            {"_id": "020", "title": "English",   "notes":["Romeo Juliet", "Hamlet", "Othello"]},
            {"_id": "030", "title": "PDP",    "notes":["functional programming", "loops", "classes"]}

        ]

        var api={
            createNotebookForUser:createNotebookForUser,
            findallNotebooks: findallNotebooks,
            deleteNotebookById:deleteNotebookById,
            updateNotebookById:updateNotebookById
        }

        return api;

        function createNotebookForUser( notebook, callback) {
            notebooks.push(notebook);
            callback(notebook);

        }

        function findallNotebooks (callback) {
            callback(notebooks);
        }

        function deleteNotebookById(notebookId, callback){

            for (var i = 0; i < notebooks.length; i++) {
                if (notebooks[i]._id == notebookId) {
                    notebooks.splice(i,1);
                    break;
                }
            }
            callback(notebooks);
        }

        function updateNotebookById(notebookId, newNotebook, callback){

            for (var i = 0; i < notebooks.length; i++) {
                if (notebooks[i]._id == notebookId) {
                    notebooks[i].title =newNotebook.title;
                    notebooks[i].notes = newNotebook.notes;
                    break;
                }
            }

            callback(notebooks[i]);

        }





    }
})();