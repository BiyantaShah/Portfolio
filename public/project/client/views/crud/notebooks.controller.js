(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("NotebookController",NotebookController);

    function NotebookController($scope, NotebookCrudService) {

        var currentAllNotebooks= []; //Notebooks of the current user
        var currentNotebook = null; //Current user is stored
        var selectedNotebookIndex = -1; //the index of the Note selected

        currentNotebook = NotebookCrudService.findallNotebooks(renderAllNotebooks);


        //event declarations
        $scope.addNotebook = addNotebook;
        $scope.deleteNotebook = deleteNotebook;
        $scope.selectNotebook = selectNotebook;
        $scope.updateNotebook = updateNotebook;


        //event implementations

        function addNotebook(noteBookName,noteName) {

            if (noteBookName != null && noteName != []) {
                var newNotebook = {
                    "_id": null,
                    "title": noteBookName,
                    "notes": noteName.split(",")
                };

                NotebookCrudService.createNotebookForUser(newNotebook, renderAdd);
            }
        }

        function deleteNotebook(index) {
            NotebookCrudService.deleteNotebookById(currentAllNotebooks[index]._id, renderDelete);
        }



        function selectNotebook(index) {
            selectedNotebookIndex = index;
            var selectNotebook = currentAllNotebooks[index];
            $scope.noteBookName = selectNotebook.title ;
            $scope.noteName = selectNotebook.notes;

        }


        function updateNotebook(noteBookName,noteName) {
            if(selectedNotebookIndex != -1){
                var selectedNotebook = currentAllNotebooks[selectedNotebookIndex];
                selectedNotebook.title = noteBookName;
                selectedNotebook.notes = noteName.split(",");
                NotebookCrudService.updateNotebookById(selectedNotebook._id, selectedNotebook, renderUpdate);

                $scope.noteBookName = null;
                $scope.noteName = null;
            }
        }

        function renderAllNotebooks(userbook) {
            //console.log(userGroup);
            $scope.notebooks = userbook;
            currentAllNotebooks = userbook;
        }

        function renderAdd(newNotebook) {
            $scope.noteBookName = null;
            $scope.noteName = null;
            $scope.notebooks = currentAllNotebooks;

        }

        function renderDelete(allGroups) {
            NotebookCrudService.findallNotebooks(renderAllNotebooks);

        }

        function renderUpdate(newGroup) {
            NotebookCrudService.findallNotebooks(renderAllNotebooks);
            selectedNotebookIndex = -1;
        }


    }
})();


