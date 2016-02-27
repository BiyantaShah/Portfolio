(function(){

    'use strict';

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, FormService,$location, UserService) {

        var currentAllUserForms= []; //Forms of the current user
        var currentUser = null; //Current user is stored
        var selectedFormIndex = -1; //the index of the form selected

        if (UserService.getCurrentUser() == null) {
            $location.path("/home");
        }
        else{
            currentUser =UserService.getCurrentUser();
            FormService.findAllFormsForUser(currentUser._id, renderAllForms);
        }

        //event declarations
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;
        $scope.updateForm = updateForm;


        //event implementations

        function addForm(formName) {

            var newForm = {
            "_id" : null,
            "title" : formName,
            "userId" : null
            };

            FormService.createFormForUser(currentUser._id, newForm, renderAdd);
        }

        function deleteForm(index) {
            selectedFormIndex= index;
            FormService.deleteFormById(currentAllUserForms[index]._id, renderDelete);
        }



        function selectForm(index) {
            selectedFormIndex = index;
            var selectForm = currentAllUserForms[index];
            $scope.formName = selectForm.title ;

        }


        function updateForm(formName) {
            if(selectedFormIndex != -1){
                var selectedForm = currentAllUserForms[selectedFormIndex];
                selectedForm.title = formName;
                FormService.updateFormById(selectedForm._id, selectedForm, renderUpdate);
                selectedFormIndex = -1;
                $scope.formName = null;
            }
        }

        function renderAllForms(userForm) {
            $scope.forms = userForm;
            currentAllUserForms = userForm;
        }

        function renderAdd(newForm) {
            $scope.formName = null;
            currentAllUserForms.push(newForm);
            $scope.forms = currentAllUserForms;

        }

        function renderDelete(allForms) {
            FormService.findAllFormsForUser(currentUser._id, renderAllForms);

        }

        function renderUpdate(newForm) {
            FormService.findAllFormsForUser(currentUser._id, renderAllForms);
        }


    }
})();
