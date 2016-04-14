(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("SearchController",SearchController);

    function SearchController(NoteService, UserService, $location, SubjectService, NotebookService, $scope) {

        var vm = this;


        var userId = null;

        vm.searchNote = searchNote;
        vm.showContent = showContent;
        vm.goToGroup = goToGroup;
        vm.goToSubject = goToSubject;

        var currentUser ;

        function init() {
            currentUser = null;
            UserService.getCurrentUser()
                .then(function (response) {
                    currentUser = response.data;

                    if (currentUser == null) {
                        $location.path("/home");
                    }
                });
        }

        init();


        function searchNote(noteName) {

            var userId;

            UserService.getCurrentUser()
                .then(
                    function(response){

                        vm.user = response.data;
                        NoteService.findNoteByTitle(vm.user._id, noteName)
                            .then(function(response){
                                if(response.data){
                                    vm.search = response.data.note;
                                    if(vm.search!=null){
                                        SubjectService.setSubjectId(response.data.subjectId);
                                        NotebookService.setNotebookId(response.data.notebookId);
                                        vm.search.noteTitle = vm.search.noteTitle;

                                    }
                                    else{
                                        $scope.message = "Note not found. Check for spelling errors!";
                                        return $scope.message;
                                    }
                                }
                            });

                    }
                );
        }

        function showContent(noteId){
            NoteService.setNoteId(noteId);
            $location.path('/noteText');
        }

        function goToGroup(){
            $location.path('/group');
        }

        function goToSubject(){
            $location.path('/subject');
        }
    }

})();