(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NoteTextController",NoteTextController);

    function NoteTextController(NoteService, $location, NotebookService, SubjectService){

        var vm = this;

        var currentNote = null;
        var currentBook = null;
        var currentSubject = null;


        function init(){
            if (NoteService.getNoteId() == null) {
                $location.path("/home");
            }
            else{

                currentSubject = SubjectService.getSubjectId();
                currentBook = NotebookService.getNotebookId();
                currentNote = NoteService.getNoteId();

                NoteService.getContent(currentSubject, currentBook, currentNote)
                    .then(function(response){
                        if(response.data){
                            vm.note = response.data;
                            vm.note.noteTitle = response.data.noteTitle;
                            vm.note.content = response.data.content;
                        }

                    });
            }

        }
        init();
    }

})();
