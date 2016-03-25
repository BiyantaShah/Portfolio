(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("SearchController",SearchController);

    function SearchController(NoteService, UserService, $location, SubjectService, NotebookService) {

        var vm = this;


        var userId = null;

        vm.searchNote = searchNote;
        vm.showContent = showContent;


        function init() {
            if (UserService.getCurrentUser == null) {
                $location.url("/home");
            }
        }

        init();


        function searchNote(noteName) {


            var userId = UserService.getCurrentUser()._id;

                    //console.log(subj);
                    NoteService.findNoteByTitle(userId, noteName)
                        .then(function(response){
                            if(response.data){

                                vm.note = response.data.note;
                                SubjectService.setSubjectId(response.data.subjectId);
                                NotebookService.setNotebookId(response.data.notebookId);

                                vm.note.noteTitle = vm.note.noteTitle;
                            }
                        });

        }

        function showContent(noteId){
            NoteService.setNoteId(noteId);
            $location.path('/noteText');
        }
    }

})();