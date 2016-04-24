(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("PreviewTextController",PreviewTextController);

    function PreviewTextController(NoteService, $routeParams, $sce) {

        var vm = this;

        vm.trustAsHtml = trustAsHtml;



        function init() {
            NoteService.findNoteById($routeParams.noteId)
                .then(function(response) {
                    if (response.data) {
                        vm.note = response.data;
                        vm.note.noteTitle = response.data.title;
                        vm.note.content = response.data.content;
                        vm.note.type = response.data.type;
                        vm.note.reminder = response.data.reminder;

                        var d = new Date(vm.note.reminder);
                        vm.note.rem = d.toDateString();

                    }
                });
        }
        init();

        function trustAsHtml(html) {

            return $sce.trustAsHtml(html);
        }


    }






})();