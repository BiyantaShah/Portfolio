(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("NoteController",NoteController);

    function NoteController($scope, NoteCrudService) {

        var currentAllUserNotes= []; //Notes of the current user
        var currentNotes = null; //Current user is stored
        var selectedNoteIndex = -1; //the index of the Note selected

        currentNotes = NoteCrudService.findAllNotesForUser(renderAllNotes);


        //event declarations
        $scope.addNote = addNote;
        $scope.deleteNote = deleteNote;
        $scope.selectNote = selectNote;
        $scope.updateNote = updateNote;


        //event implementations

        function addNote(noteName,username) {

            if (noteName != null && username !=null) {
                var newForm = {
                    "_id": null,
                    "title": noteName,
                    "userId": null,
                    "username": username
                };

                NoteCrudService.createNoteForUser(newForm, renderAdd);
            }
        }

        function deleteNote(index) {
            NoteCrudService.deleteNoteById(currentAllUserNotes[index]._id, renderDelete);
        }



        function selectNote(index) {
            selectedNoteIndex = index;
            var selectNote = currentAllUserNotes[index];
            $scope.noteName = selectNote.title ;
            $scope.username = selectNote.username;

        }


        function updateNote(noteName,username) {
            if(selectedNoteIndex != -1){
                var selectedNote = currentAllUserNotes[selectedNoteIndex];
                selectedNote.title = noteName;
                selectedNote.username = username;
                NoteCrudService.updateNoteById(selectedNote._id, selectedNote, renderUpdate);

                $scope.noteName = null;
                $scope.username = null;
            }
        }

        function renderAllNotes(userNote) {
            $scope.notes = userNote;
            currentAllUserNotes = userNote;
        }

        function renderAdd(newNote) {
            $scope.noteName = null;
            $scope.username = null;
            $scope.notes = currentAllUserNotes;

        }

        function renderDelete(allNotes) {
            NoteCrudService.findAllNotesForUser(renderAllNotes);

        }

        function renderUpdate(newForm) {
            NoteCrudService.findAllNotesForUser(renderAllNotes);
            selectedNoteIndex = -1;
        }


    }
})();
