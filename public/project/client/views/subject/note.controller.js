(function(){

    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NoteController",NoteController);

    function NoteController($scope,$location, NoteService,$routeParams, UserService) {

        var vm = this;


        vm.addNote = addNote;
        vm.deleteNote = deleteNote;
        vm.selectNote = selectNote;
        vm.updateNote = updateNote;
        vm.goToNoteText = goToNoteText;

        function init() {

                NoteService.getAllNotesForBook($routeParams.notebookId)
                    .then(function(response){
                        vm.notes = response.data;
                        currentAllNotes = response.data;
                    });


        }
        init();

        var currentAllNotes= []; //Notes of the user is stored
        var currentNotebook = null; //Current notebook is stored
        var currentSubject = null; //Current Subject is stored





        //event implementations

        function addNote(noteName) {
            var currentUser = null;

            if (noteName == null) {
                $scope.message = "Give a title to the subject";
                return $scope.message;
            }

            else{

                var newNote = {
                    "._id":null,
                    "title":noteName,
                    "content":null,
                    "notebookId": $routeParams.notebookId,
                    //"userId": currentUser._id
                };
                NoteService.createNoteForBook($routeParams.notebookId, newNote)
                    .then(function(response){

                        vm.note.noteName = null;
                        init();

                    });
            }

        }

        function deleteNote(index) {

            NoteService.deleteNoteFromBook(vm.notes[index]._id);
            init();
        }


        function selectNote(index) {
            vm.index = index;
            vm.note = vm.notes[index];
            vm.note.noteName = vm.notes[index].title;

        }


        function updateNote(noteName) {
            if(vm.index != -1 && noteName != null){

                var selectedNote = vm.notes[vm.index];
                selectedNote.title = noteName;
                NoteService.updateNote(selectedNote._id, selectedNote);
                init();
                vm.index = -1;
                vm.note.noteName = null;
            }
        }

        function goToNoteText(noteId){
            //NoteService.setNoteId(noteId);
            $location.path('/subject/' + $routeParams.subjectId
                + '/notebook/' +$routeParams.notebookId + '/note/' + noteId +
                '/noteText');
        }

    }
})();

