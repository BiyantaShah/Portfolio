(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("CheckListController",CheckListController);

    function CheckListController(NoteService, $routeParams, $scope){

        var vm = this;
        var array = [];
        vm.saveContent = saveContent;

        vm.addItem = addItem;
        vm.deleteField = deleteField;
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

                        if(vm.note.content == ""){
                            vm.array = [];
                        }
                        else{
                            vm.array = vm.note.content.split(",");

                        }

                        var d = new Date (vm.note.reminder);
                        vm.note.rem = d.toDateString();
                    }

                });


        }
        init();

        function saveContent(note){
            vm.note = note;

            var updateContent = {
                "_id":vm.note._id,
                "title": vm.note.title,
                "content": vm.note.content + "," + vm.note.content,
                "userId": vm.note.userId,
                "type": vm.note.type
            };


            NoteService.updateNote(vm.note._id, updateContent)
                .then(function(response){
                    vm.note.list = null;
                    init();

                })

        }

        function addItem(note){
            vm.note = note;



            if(vm.note.list == null){
                $scope.message = "Please enter an item name";
                return;
            }

            if(vm.note.content == ""){
                var newField = vm.note.list;
            }

            else{
                var newField = vm.note.content + "," + vm.note.list;
            }

            NoteService.addItem($routeParams.noteId, newField)
                .then(function(response){
                    vm.note.list = null;
                    init();


                })


        }

        function deleteField(index, contentArray){

            vm.index = index;
            vm.contentArray = contentArray;

            vm.contentArray.splice(index,1);

            var contentString = vm.contentArray.toString();


            NoteService.addItem($routeParams.noteId, contentString)
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

