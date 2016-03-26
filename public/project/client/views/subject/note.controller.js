(function(){

    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NoteController",NoteController);

    function NoteController($scope, NotebookService ,$location, NoteService, SubjectService) {

        var vm = this;


        vm.addNote = addNote;
        vm.deleteNote = deleteNote;
        vm.selectNote = selectNote;
        vm.updateNote = updateNote;
        vm.goToNoteText = goToNoteText;

        function init() {
            if (NotebookService.getNotebookId() == null) {
                $location.path("/home");
            }
            else{
                currentSubject = SubjectService.getSubjectId();
                currentNotebook = NotebookService.getNotebookId();
                NoteService.getAllNotesForBook(currentNotebook, currentSubject)
                    .then(function(response){
                        vm.notes = response.data;
                        currentAllNotes = response.data;
                    });
            }

        }
        init();

        var currentAllNotes= []; //Notes of the user is stored
        var currentNotebook = null; //Current notebook is stored
        var currentSubject = null; //Current Subject is stored





        //event implementations

        function addNote(noteName) {

            if (noteName == null) {
                $scope.message = "Give a title to the subject";
                return $scope.message;
            }

            else{

                var newNote = {
                    "._id":null,
                    "noteTitle":noteName


                };
                NoteService.createNoteForBook(SubjectService.getSubjectId(),
                    NotebookService.getNotebookId(), newNote)
                    .then(function(response){

                        vm.note.noteName = null;
                        init();

                    });
            }

        }

        function deleteNote(index) {

            NoteService.deleteNoteFromBook(SubjectService.getSubjectId(),
                NotebookService.getNotebookId(),vm.notes[index]._id);
            init();
        }


        function selectNote(index) {
            vm.index = index;
            vm.note = vm.notes[index];
            vm.note.noteName = vm.notes[index].noteTitle;

        }


        function updateNote(noteName) {
            if(vm.index != -1 && noteName != null){

                var selectedNote = vm.notes[vm.index];
                selectedNote.noteTitle = noteName;
                NoteService.updateNote(SubjectService.getSubjectId(),
                    NotebookService.getNotebookId(),selectedNote._id, selectedNote);
                init();
                vm.index = -1;
                vm.note.noteName = null;
            }
        }

        function goToNoteText(noteId){
            NoteService.setNoteId(noteId);
            $location.path('/noteText');
        }

    }
})();

