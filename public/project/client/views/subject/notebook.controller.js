(function(){

    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NotebookController",NotebookController);

    function NotebookController($scope, NotebookService ,$location, $routeParams, UserService) {

        var vm = this;


        vm.addNotebook = addNotebook;
        vm.deleteNotebook = deleteNotebook;
        vm.selectNotebook = selectNotebook;
        vm.updateNotebook = updateNotebook;
        vm.goToNote = goToNote;



        function init() {


            if($routeParams.subjectId == ":subjectId"){
                UserService.getCurrentUser()
                    .then(function(response){
                        vm.user = response.data;
                        NotebookService.getAllNotebooksForUser(vm.user._id)
                            .then(function(response){
                                vm.notebooks = response.data;
                                currentAllNotebooks = response.data;
                            })
                    })
            }
            else{
                UserService.getCurrentUser()
                    .then(function(response){
                        vm.user = response.data;
                        NotebookService.getAllNotebooksForSubject($routeParams.subjectId)
                            .then(function(response){
                                vm.notebooks = response.data;
                                currentAllNotebooks = response.data;
                            });
                    });


            }

        }
        init();

        var currentAllNotebooks= []; //Notebooks of the user is stored
        var currentSubject = null; //Current subject is stored





        //event implementations

        function addNotebook(notebook) {

            if (notebook == undefined || notebook.notebookName == null || notebook.notebookName == "" ) {
                $scope.message = "Please give a title to the Notebook";
                return $scope.message;
            }

            else{
                if($routeParams.subjectId == ":subjectId"){
                    var newBook = {
                        //"_id": null,
                        "label": notebook.notebookName,
                        "userId": vm.user._id
                    };

                    NotebookService.createNotebookForUser(vm.user._id, newBook)
                        .then(function(response){
                            vm.notebook.notebookName = null;
                            init();
                        });
                }
                else{

                    var newBook = {
                        "label":notebook.notebookName,
                        "userId": vm.user._id,
                        "subjectId": $routeParams.subjectId

                    };

                    NotebookService.createNotebookForSubject($routeParams.subjectId, newBook, vm.user._id)
                        .then(function(response){
                            vm.notebook.notebookName = null;
                            init();
                        });
                    }

            }

        }

        function deleteNotebook(index) {

            NotebookService.deleteNotebookFromSubject(vm.notebooks[index]._id)
                .then(function(response){
                    if(response.data){
                        init();
                    }
                });

        }


        function selectNotebook(index) {
            vm.index = index;
            vm.notebook = vm.notebooks[index];
            vm.notebook.notebookName = vm.notebooks[index].label;

        }


        function updateNotebook(notebook) {

            if ( notebook.notebookName == "" ) {
                $scope.message = "Please give a title to the Notebook";
                return $scope.message;
            }

            if(vm.index != -1 && notebook.notebookName != null){

                var selectedBook = vm.notebooks[vm.index];
                var updateBook = {
                    "_id":selectedBook._id,
                    "userId": vm.user._id,
                    "label": notebook.notebookName
                };
                NotebookService.updateNotebook(selectedBook._id, updateBook)
                    .then(function(response){
                        vm.notebooks[vm.index] = response.data;
                        vm.notebook.notebookName = null;
                        vm.index = -1;
                        init();
                    });
            }
        }

        function goToNote(notebookId){
           // NotebookService.setNotebookId(notebookId);
            $location.path('/subject/' + $routeParams.subjectId + '/notebook/' + notebookId + '/note');
        }

    }
})();

