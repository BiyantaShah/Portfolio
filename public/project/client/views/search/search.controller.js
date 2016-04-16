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
        vm.goToNote = goToNote;

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


        function searchNote(title) {

            NoteService.findNoteByTitle(currentUser._id, title)
                .then(function(response){
                    if(response.data){
                        vm.note = response.data;
                        if(vm.note!=null){

                            //SubjectService.setSubjectId(response.data.subjectId);
                            //  NotebookService.setNotebookId(response.data.notebookId);
                            vm.note.title = vm.note[0].title;
                        }
                        else{
                            $scope.message = "Note not found. Check for spelling errors!";
                            return $scope.message;
                        }
                    }
                });
        }

        function showContent(noteId){
            NoteService.setNoteId(noteId);
            $location.path('/note/' + noteId + '/noteText');
        }

        function goToGroup(){
            $location.path('/group');
        }

        function goToNote(){
            $location.path('/subject');
        }
    }

})();