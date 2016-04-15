(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NoteTextController",NoteTextController);

    function NoteTextController(NoteService, $routeParams){

        var vm = this;
        vm.saveContent = saveContent;

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

        function saveContent(note){
            vm.note = note;

            var updateContent = {
                "_id":vm.note._id,
                "title": vm.note.title,
                "content": vm.note.content,
                "userId": vm.note.userId
            };

            console.log(updateContent);

            NoteService.updateNote(vm.note._id, updateContent)
                .then(function(response){
                    init();
                })

        }
    }

})();
