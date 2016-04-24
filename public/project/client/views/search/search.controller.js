(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("SearchController",SearchController);

    function SearchController(NoteService, UserService, $location, $scope) {

        var vm = this;


        var userId = null;

        vm.searchNote = searchNote;
        vm.showContent = showContent;


        var currentUser ;

        function init() {
            currentUser = null;
            UserService.getCurrentUser()
                .then(function (response) {
                    currentUser = response.data;

                    if (currentUser == null) {
                        $location.path("/home");
                    }

                    NoteService.getAllNotesForUser(currentUser._id)
                        .then(function(response){
                            vm.notes = response.data;
                        })

                });
        }

        init();


        function searchNote(note) {

            if(note == null){
                $scope.message = "Enter a title or the first two letters to find a Note";
                return;
            }

            var title = note.title;
            NoteService.searchNote(note)
                .then(function(response){
                    if(response.data){
                        vm.note = response.data;
                        if(vm.note!=null){
                            for(var i in vm.note){
                                if(vm.note[i].title == title){
                                    vm.note1 = vm.note[i];
                                    vm.note.title = vm.note[i].title;
                                    break;
                                }
                            }
                        }
                        else{
                            $scope.message = "Note not found. Check for spelling errors!";
                            return $scope.message;
                        }
                    }
                });
        }

        function showContent(note){
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