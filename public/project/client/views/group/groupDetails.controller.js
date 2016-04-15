(function(){
    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("DetailsController",DetailsController);

    function DetailsController(GroupService, $routeParams, $location){

        var vm = this;

        vm.goToNoteText = goToNoteText;
        function init(){


            GroupService.findGroupById($routeParams.groupId)
                .then(function(response){
                    if(response.data){
                        vm.group = response.data;
                        vm.group.title = response.data.title;
                        console.log(vm.group.title);
                        vm.group.members = response.data.members;
                        vm.group.shared = response.data.shared;
                    }

                });


        }
        init();

        function goToNoteText(noteIds){

            for(var i in noteIds){
                $location.path('/note/' + noteIds[i] + '/noteText');
                break;
            }

        }
    }

})();
