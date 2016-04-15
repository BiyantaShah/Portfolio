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

            if($routeParams.notebookId == ":notebookId"){
                UserService.getCurrentUser()
                    .then(function(response){
                        vm.user = response.data;
                        NoteService.getAllNotesForUser(vm.user._id)
                            .then(function(response){
                                vm.notes = response.data;
                                currentAllNotes = response.data;
                            });

                    });
            }
            else{
                UserService.getCurrentUser()
                    .then(function(response){
                        vm.user = response.data;
                        NoteService.getAllNotesForBook($routeParams.notebookId)
                            .then(function(response){
                                vm.notes = response.data;
                                currentAllNotes = response.data;
                            });
                    });


            }

        }
        init();

        var currentAllNotes= []; //Notes of the user is stored
        var currentNotebook = null; //Current notebook is stored
        var currentSubject = null; //Current Subject is stored





        //event implementations

        function addNote(note) {
            var currentUser = null;

            if (note.noteName == null) {
                $scope.message = "Give a title to the note";
                return $scope.message;
            }

            else{
                if($routeParams.notebookId == ":notebookId"){
                    var newNote = {
                       //"_id": null,
                        "title": note.noteName,
                        "content": null,
                        "userId": vm.user._id
                    };
                    NoteService.createNoteForUser(vm.user._id, newNote)
                        .then(function(response){
                            vm.note.noteName = null;
                            init();
                        })
                }
                else{
                    var newNote = {
                       // "_id":null,
                        "title":note.noteName,
                        "content":null,
                        "notebookId": $routeParams.notebookId,
                        "userId": vm.user._id
                    };
                    NoteService.createNoteForBook($routeParams.notebookId, newNote, vm.user._id)
                        .then(function(response){

                            vm.note.noteName = null;
                            init();

                        });
                }

            }

        }

        function deleteNote(index) {

            NoteService.deleteNoteFromBook(vm.notes[index]._id)
                .then(function(response){
                    if(response.data){
                        init();
                    }
                });
        }


        function selectNote(index) {
            vm.index = index;
            vm.note = vm.notes[index];
            vm.note.noteName = vm.notes[index].title;

        }


        function updateNote(note) {
            if(vm.index != -1 && note.noteName != null){

                var selectedNote = vm.notes[vm.index];
                var updateNote = {
                    "_id":selectedNote._id,
                    "title": note.noteName,
                    "content": selectedNote.content,
                    "userId": vm.user._id
                };

                NoteService.updateNote(selectedNote._id, updateNote)
                    .then(function(response){
                        vm.notes[vm.index] = response.data;
                        vm.note.noteName = null;
                        vm.index = -1;
                        init();
                    });

            }
        }

        function goToNoteText(noteId){
            //NoteService.setNoteId(noteId);
            $location.path( '/note/' + noteId + '/noteText');
        }

    }
})();

