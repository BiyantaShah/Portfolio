(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("ListContentController",ListContentController);

    function ListContentController(CheckListService, $routeParams){

        var vm = this;
        function init(){


            CheckListService.getContent($routeParams.checklistId)
                .then(function(response){
                    if(response.data){
                        vm.checklist = response.data;
                        vm.checklist.title = response.data.title;
                        vm.checklist.content = response.data.content;
                    }

                });


        }
        init();
    }

})();
