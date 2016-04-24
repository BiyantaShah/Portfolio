(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("PreviewListController",PreviewListController);

    function PreviewListController(NoteService, $routeParams, $sce) {

        var vm = this;

        //vm.trustAsHtml = trustAsHtml;



        function init() {
            NoteService.findNoteById($routeParams.noteId)
                .then(function(response) {
                    if (response.data) {
                        vm.note = response.data;
                        vm.note.noteTitle = response.data.title;
                        vm.note.content = response.data.content;
                        vm.note.type = response.data.type;

                        vm.content = vm.note.content.split(",");
                        if(vm.content == ""){
                            vm.content = null;
                        }

                    }
                });
        }
        init();

        /*function trustAsHtml(html) {

            return $sce.trustAsHtml(html);
        }*/


    }






})();/**
 * Created by Biyanta on 24/04/16.
 */
