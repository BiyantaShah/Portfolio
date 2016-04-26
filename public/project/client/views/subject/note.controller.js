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

            if(note == undefined){
                vm.message = "Please fill in you details for your note";
                return $scope.message;
            }

            if (note.noteName == null || note.noteName == "") {
                vm.message = "Please give a title to the note";
                return $scope.message;
            }

            if(note.typeN == null || note.typeN ==""){
                vm.message = "Please select a type for the note";
                return $scope.message;
            }

            else{
                if($routeParams.notebookId == ":notebookId"){
                    var newNote = {
                       //"_id": null,
                        "title": note.noteName,
                        "content": [],
                        "userId": vm.user._id,
                        "type": note.typeN,
                        "reminder": null
                    };
                    NoteService.createNoteForUser(vm.user._id, newNote)
                        .then(function(response){
                            vm.note.noteName = null;
                            vm.note.typeN = null;
                            init();

                        })
                }
                else{
                    var newNote = {
                       // "_id":null,
                        "title":note.noteName,
                        "content":[],
                        "notebookId": $routeParams.notebookId,
                        "userId": vm.user._id,
                        "type": note.typeN,
                        "reminder": null
                    };

                    NoteService.createNoteForBook($routeParams.notebookId, newNote, vm.user._id)
                        .then(function(response){
                            vm.note.noteName = null;
                            vm.note.typeN =null;
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
            vm.note.typeN = vm.notes[index].type;

        }


        function updateNote(note) {
            if (note.noteName == "") {
                vm.message = "Please give a title to the note";
                return vm.message;
            }


            if(vm.index != -1 && note.noteName != null){

                var selectedNote = vm.notes[vm.index];
                var updateNote = {
                    "_id":selectedNote._id,
                    "title": note.noteName,
                    "content": selectedNote.content,
                    "userId": vm.user._id,
                    "type": selectedNote.typeN,
                    "reminder": note.reminder
                };

                NoteService.updateNote(selectedNote._id, updateNote)
                    .then(function(response){
                        vm.notes[vm.index] = response.data;
                        vm.note.noteName = null;
                        vm.note.typeN = null;
                        vm.index = -1;
                        init();
                    });

            }
        }

        function goToNoteText(note){
            vm.note = note;
            if(note.type == "Text"){
                var noteId = vm.note._id;
                $location.path( '/note/' + noteId + '/noteText');
            }
            else if (note.type == "CheckList"){
                var noteId = vm.note._id;
                $location.path('/note/' + noteId + '/checklist');
            }

        }

    }
})();

