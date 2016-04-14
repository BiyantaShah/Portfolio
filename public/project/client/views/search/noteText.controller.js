(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NoteTextController",NoteTextController);

    function NoteTextController(NoteService, $routeParams){

        var vm = this;
        function init(){


                NoteService.getContent($routeParams.subjectId, $routeParams.notebookId, $routeParams.noteId)
                    .then(function(response){
                        if(response.data){
                            vm.note = response.data;
                            vm.note.noteTitle = response.data.noteTitle;
                            vm.note.content = response.data.content;
                        }

                    });


        }
        init();
    }

})();
