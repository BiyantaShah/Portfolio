(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NoteTextController",NoteTextController);

    function NoteTextController(NoteService, $routeParams){

        var vm = this;
        function init(){


                NoteService.findNoteById($routeParams.noteId)
                    .then(function(response){
                        if(response.data){
                            vm.note = response.data;
                            vm.note.noteTitle = response.data.title;
                            vm.note.content = response.data.content;
                        }

                    });


        }
        init();
    }

})();
