(function(){

    "use strict";

    angular
        .module("NoteTakerWebsite")
        .controller("SubjectController",SubjectController);

    function SubjectController($scope, SubjectService ,$location, UserService) {

        var vm = this;


        vm.addSubject = addSubject;
        vm.deleteSubject = deleteSubject;
        vm.selectSubject = selectSubject;
        vm.updateSubject = updateSubject;
        vm.goToNoteBook = goToNoteBook;

        function init() {
            if (UserService.getCurrentUser() == null) {
                $location.path("/home");
            }
            else{
                currentUser =UserService.getCurrentUser();
                SubjectService.findAllSubjectsForUser(currentUser._id)
                    .then(function(response){
                        vm.subjects = response.data;
                        currentAllUserSubjects = response.data;
                    });
            }

        }
        init();

        var currentAllUserSubjects= []; //Forms of the current user
        var currentUser = null; //Current user is stored





        //event implementations

        function addSubject(subjectName) {

            if (subjectName == null) {
                $scope.message = "Give a title to the subject";
                return $scope.message;
            }

            else{

                var nsubject = {
                    "._id":null,
                    "title":subjectName,
                    "userId": null
                };
                SubjectService.createSubjectForUser(UserService.getCurrentUser()._id, nsubject)
                    .then(function(response){

                        vm.subject.subjectName = null;
                        init();

                    });
            }

        }

        function deleteSubject(index) {

            SubjectService.deleteSubjectById(vm.subjects[index]._id);
            init();
        }


        function selectSubject(index) {
            vm.index = index;
            vm.subject = vm.subjects[index];
            vm.subject.subjectName = vm.subjects[index].title;

        }


        function updateSubject(subjectName) {
            if(vm.index != -1 && subjectName != null){

                var selectedSubject = vm.subjects[vm.index];
                selectedSubject.title = subjectName;
                SubjectService.updateSubjectById(selectedSubject._id, selectedSubject);
                init();
                vm.index = -1;
                vm.subject.subjectName = null;
            }
        }

        function goToNoteBook(subjectId){
            SubjectService.setSubjectId(subjectId);
            $location.path('/notebook');
        }

    }
})();
