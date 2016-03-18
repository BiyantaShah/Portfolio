(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, FormService,$location, UserService) {

        var vm = this;

        vm.register = register;
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;

        function init() {

        }
        init();

        var currentAllUserForms= []; //Forms of the current user
        var currentUser = null; //Current user is stored
        var selectedFormIndex = -1; //the index of the form selected

        if (UserService.getCurrentUser() == null) {
            $location.path("/home");
        }
        else{
            currentUser =UserService.getCurrentUser();
            FormService.findAllFormsForUser(currentUser._id)
                .then(function(response){
                    $scope.forms = userForm;
                    currentAllUserForms = userForm;
            });
        }


        //event implementations

        function addForm(formName) {

            if (formName != null) {
                var newForm = {
                    "_id": null,
                    "title": formName,
                    "userId": null
                };

                FormService.createFormForUser(currentUser._id, newForm)
                    .then(function(response){
                        var form = response.data;
                        if (form != null){
                            $scope.formName = null;
                            currentAllUserForms.push(newForm);
                            $scope.forms = currentAllUserForms;
                        }

                    });
            }
        }

        function deleteForm(index) {
            FormService.deleteFormById(currentAllUserForms[index]._id)
                .then(function(response){
                        if(response.data !== null) {

                            FormService.findAllFormsForUser(currentUser._id);
                        }

                }
                    .then(function(response){
                        $scope.forms = userForm;
                        currentAllUserForms = userForm;
                    })
                );

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
                FormService.updateFormById(selectedForm._id, selectedForm)
                    .then(function(response){
                        if(response.data !== null) {
                            FormService.findAllFormsForUser(currentUser._id);
                            selectedFormIndex = -1;
                        }

                    }
                        .then(function(response){
                            $scope.forms = userForm;
                            currentAllUserForms = userForm;
                        })
                    );

                $scope.formName = null;
            }
        }

    }
})();
