(function(){

    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NotebookController",NotebookController);

    function NotebookController($scope, NotebookService ,$location, SubjectService, $routeParams) {

        var vm = this;


        vm.addNotebook = addNotebook;
        vm.deleteNotebook = deleteNotebook;
        vm.selectNotebook = selectNotebook;
        vm.updateNotebook = updateNotebook;
        vm.goToNote = goToNote;

        function init() {
                NotebookService.getAllNotebooksForSubject($routeParams.subjectId)
                    .then(function(response){
                        vm.notebooks = response.data;
                        currentAllNotebooks = response.data;
                    });

        }
        init();

        var currentAllNotebooks= []; //Notebooks of the user is stored
        var currentSubject = null; //Current subject is stored





        //event implementations

        function addNotebook(notebookName) {

            if (notebookName == null) {
                $scope.message = "Give a title to the subject";
                return $scope.message;
            }

            else{

                var newBook = {
                    "._id":null,
                    "label":notebookName,
                    "notes": []

                };
                NotebookService.createNotebookForSubject($routeParams.subjectId, newBook)
                    .then(function(response){

                        vm.notebook.notebookName = null;
                        init();

                    });
            }

        }

        function deleteNotebook(index) {

            NotebookService.deleteNotebookFromSubject($routeParams.subjectId,vm.notebooks[index]._id);
            init();
        }


        function selectNotebook(index) {
            vm.index = index;
            vm.notebook = vm.notebooks[index];
            vm.notebook.notebookName = vm.notebooks[index].label;

        }


        function updateNotebook(notebookName) {
            if(vm.index != -1 && notebookName != null){

                var selectedBook = vm.notebooks[vm.index];
                selectedBook.label = notebookName;
                NotebookService.updateNotebook($routeParams.subjectId,selectedBook._id, selectedBook);
                init();
                vm.index = -1;
                vm.notebook.notebookName = null;
            }
        }

        function goToNote(notebookId){
           // NotebookService.setNotebookId(notebookId);
            $location.path('/subject/' + $routeParams.subjectId + '/notebook/' + notebookId + '/note');
        }

    }
})();

