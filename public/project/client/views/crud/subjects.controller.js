(function(){

    'use strict';

    angular
        .module("NoteTakerWebsite")
        .controller("SubjectController",SubjectController);

    function SubjectController($scope, SubjectCrudService) {

        var currentAllSubjects= []; //Notebooks of the current user
        var currentSubject = null; //Current user is stored
        var selectedSubjectIndex = -1; //the index of the Note selected

        currentSubject = SubjectCrudService.findAllSubjects(renderAllSubjects);


        //event declarations
        $scope.addSubject = addSubject;
        $scope.deleteSubject = deleteSubject;
        $scope.selectSubject = selectSubject;
        $scope.updateSubject = updateSubject;


        //event implementations

        function addSubject(subjectName,noteBookName) {

            if (noteBookName != null && subjectName != []) {
                var newSubject = {
                    "_id": null,
                    "title": subjectName,
                    "notebooks": noteBookName.split(",")
                };

                SubjectCrudService.createSubjectForUser(newSubject, renderAdd);
            }
        }

        function deleteSubject(index) {
            SubjectCrudService.deleteSubjectById(currentAllSubjects[index]._id, renderDelete);
        }



        function selectSubject(index) {
            selectedSubjectIndex = index;
            var selectSubject = currentAllSubjects[index];
            $scope.subjectName = selectSubject.title ;
            $scope.noteBookName = selectSubject.notebooks;

        }


        function updateSubject(subjectName,noteBookName) {
            if(selectedSubjectIndex != -1){
                var selectedSubject = currentAllSubjects[selectedSubjectIndex];
                selectedSubject.title = subjectName;
                selectedSubject.notebooks = noteBookName.split(",");
                SubjectCrudService.updateSubjectById(selectedSubject._id, selectedSubject, renderUpdate);

                $scope.subjectName = null;
                $scope.noteBookName = null;
            }
        }

        function renderAllSubjects(usersubject) {
            //console.log(userGroup);
            $scope.subjects = usersubject;
            currentAllSubjects = usersubject;
        }

        function renderAdd(newSubject) {
            $scope.noteBookName = null;
            $scope.subjectName = null;
            $scope.subjects = currentAllSubjects;

        }

        function renderDelete(allGroups) {
            SubjectCrudService.findAllSubjects(renderAllSubjects);

        }

        function renderUpdate(newSubject) {
            SubjectCrudService.findAllSubjects(renderAllSubjects);
            selectedSubjectIndex = -1;
        }


    }
})();


