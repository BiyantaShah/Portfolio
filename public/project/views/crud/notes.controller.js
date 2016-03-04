(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("NoteController",NoteController);

    function NoteController($scope, NoteService,$location, UserService) {

        var currentAllUserNotes= []; //Notes of the current user
        var currentUser = null; //Current user is stored
        var selectedNoteIndex = -1; //the index of the Note selected

        if (UserService.getCurrentUser() == null) {
            $location.path("/home");
        }
        else{
            currentUser = UserService.getCurrentUser();
            NoteService.findAllNotesForUser(currentUser._id, renderAllForms);
        }

        //event declarations
        $scope.addNote = addNote;
        $scope.deleteNote = deleteNote;
        $scope.selectNote = selectNote;
        $scope.updateNote = updateNote;


        //event implementations

        function addNote(noteName) {

            if (noteName != null) {
                var newForm = {
                    "_id": null,
                    "title": noteName,
                    "userId": null
                };

                NoteService.createNoteForUser(currentUser._id, newForm, renderAdd);
            }
        }

        function deleteNote(index) {
            NoteService.deleteNoteById(currentAllUserNotes[index]._id, renderDelete);
        }



        function selectNote(index) {
            selectedNoteIndex = index;
            var selectNote = currentAllUserNotes[index];
            $scope.noteName = selectNote.title ;

        }


        function updateNote(noteName) {
            if(selectedNoteIndex != -1){
                var selectedNote = currentAllUserNotes[selectedNoteIndex];
                selectedNote.title = noteName;
                NoteService.updateNoteById(selectedNote._id, selectedNote, renderUpdate);

                $scope.noteName = null;
            }
        }

        function renderAllForms(userNote) {
            $scope.notes = userNote;
            currentAllUserNotes = userNote;
        }

        function renderAdd(newNote) {
            $scope.noteName = null;
            currentAllUserNotes.push(newNote);
            $scope.notes = currentAllUserNotes;

        }

        function renderDelete(allNotes) {
            NoteService.findAllNotesForUser(currentUser._id, renderAllForms);

        }

        function renderUpdate(newForm) {
            NoteService.findAllNotesForUser(currentUser._id, renderAllForms);
            selectedNoteIndex = -1;
        }


    }
})();
