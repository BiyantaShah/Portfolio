(function(){

    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("CheckListController",CheckListController);

    function CheckListController($scope, CheckListService ,$location, UserService) {

        var vm = this;


        vm.addCheckList = addCheckList;
        vm.deleteChecklist = deleteChecklist;
        vm.selectCheckList = selectCheckList;
        vm.updateCheckList = updateCheckList;
        vm.goToChecklist = goToChecklist;

        vm.index = -1;
        var currentUser;
        var currentAllUserChecklist= []; //Forms of the current user

        function init() {


            UserService.getCurrentUser()
                .then(function(response) {
                    currentUser = response.data;

                    if (currentUser == null) {
                        $location.path("/home");
                    }
                    else {
                        CheckListService.findAllCheckListsForUser(currentUser._id)
                            .then(function (response) {
                                vm.checklists = response.data;
                                currentAllUserChecklist = response.data;
                            });
                    }
                });

        }
        init();


        //event implementations

        function addCheckList(checkListName) {

            if (checkListName == null) {
                $scope.message = "Give a title to the subject";
                return $scope.message;
            }

            else{

                var newList = {
                    "._id":null,
                    "title":checkListName,
                    "userId": currentUser._id,
                    "content":null
                };

                UserService.getCurrentUser()
                    .then(function(response){
                        vm.user = response.data;
                        CheckListService.createCheckListForUser(vm.user._id, newList)
                            .then(function(response){

                                vm.checklist.listName = null;
                                init();

                            });
                    });
            }

        }

        function deleteChecklist(index) {

            CheckListService.deleteCheckListById(vm.checklists[index]._id);
                init();

        }


        function selectCheckList(index) {
            vm.index = index;
            vm.checklist = vm.checklists[index];
            vm.checklist.listName = vm.checklists[index].title;

        }


        function updateCheckList(checkListName) {
            if(vm.index != -1 && checkListName != null){

                var selectedCheckList = vm.checklists[vm.index];
                selectedCheckList.title = checkListName;
                CheckListService.updateCheckListById(selectedCheckList._id, selectedCheckList);
                init();
                vm.index = -1;
                vm.checklist.listName = null;
            }
        }

        function goToChecklist(checklistId){
            //SubjectService.setSubjectId(subjectId);
            $location.path('/checkList/' + checklistId + '/contentList');
        }

    }
})();
