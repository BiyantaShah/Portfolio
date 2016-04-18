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

        vm.index = -1;
        var currentUser;
        var currentAllUserSubjects= []; //Forms of the current user

        function init() {
            currentUser = null;

            UserService.getCurrentUser()
                .then(function(response) {
                    currentUser = response.data;

                    if (currentUser == null) {
                        $location.path("/home");
                    }
                    else {
                        SubjectService.findAllSubjectsForUser(currentUser._id)
                            .then(function (response) {
                                vm.subjects = response.data;
                                //currentAllUserSubjects = response.data;
                            });
                    }
                });

        }
        init();








        //event implementations

        function addSubject(subject) {

            if (subject == null || subject.subjectName == "") {
                $scope.message = "Give a title to the subject";
                return $scope.message;
            }

            else{

                var nsubject = {
                    //"._id":null,
                    "title":subject.subjectName,
                    "userId": currentUser._id
                };

                        SubjectService.createSubjectForUser(currentUser._id, nsubject)
                            .then(function(response){

                                vm.subject.subjectName = null;
                                init();

                            });



            }

        }

        function deleteSubject(index) {

            SubjectService.deleteSubjectById(vm.subjects[index]._id)
            .then(function(response){
                if(response.data){
                    init();
                }
            });
        }


        function selectSubject(index) {
            vm.index = index;
            vm.subject = vm.subjects[index];
            vm.subject.subjectName = vm.subjects[index].title;

        }


        function updateSubject(subject) {

            if (subject.subjectName == "") {
                $scope.message = "Give a title to the subject";
                return $scope.message;
            }


            if(vm.index != -1 && subject.subjectName != null){

                var selectedSubject = vm.subjects[vm.index];
                var updateSubject = {
                    "_id":selectedSubject._id,
                    "userId": currentUser._id,
                    "title": subject.subjectName
                };

                SubjectService.updateSubjectById(selectedSubject._id, updateSubject)
                    .then(function(response){
                        if(response.data){
                            vm.subjects[vm.index] = response.data;
                            vm.subject.subjectName = null;
                            vm.index = -1;

                            init();
                        }
                    });



            }
        }

        function goToNoteBook(subjectId){
            //SubjectService.setSubjectId(subjectId);
            $location.path('/subject/' + subjectId + '/notebook');
        }

    }
})();
