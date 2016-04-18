(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("NoteTextController",NoteTextController);

    function NoteTextController(NoteService, $routeParams){

        var vm = this;
        vm.saveContent = saveContent;
        vm.saveReminder = saveReminder;

        function init(){


                NoteService.findNoteById($routeParams.noteId)
                    .then(function(response){
                        if(response.data){
                            vm.note = response.data;
                            vm.note.noteTitle = response.data.title;
                            vm.note.content = response.data.content;
                            vm.note.type = response.data.type;
                            vm.note.reminder = response.data.reminder;
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
                "userId": vm.note.userId,
                "type":vm.note.type,
                "reminder": vm.note.reminder
            };


            NoteService.updateNote(vm.note._id, updateContent)
                .then(function(response){
                    init();
                })

        }

        function saveReminder(note, reminder){
            vm.note = note;
            vm.reminder = reminder;



            var updateContent = {
                "_id":vm.note._id,
                "title": vm.note.title,
                "content": vm.note.content,
                "userId": vm.note.userId,
                "type":vm.note.type,
                "reminder": vm.reminder
            };


            NoteService.updateNote(vm.note._id, updateContent)
                .then(function(response){
                    init();
                })

        }
    }

})();
