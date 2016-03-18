(function(){

    "use strict";

    angular
        .module("FormBuilderApp")
        .controller("FormController",FormController);

    function FormController($scope, FormService,$location, UserService) {

        var vm = this;


        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.updateForm = updateForm;

        function init() {
            if (UserService.getCurrentUser() == null) {
                $location.path("/home");
            }
            else{
                currentUser =UserService.getCurrentUser();
                FormService.findAllFormsForUser(currentUser._id)
                    .then(function(response){
                        vm.forms = response.data;
                        currentAllUserForms = response.data;
                    });
            }

        }
        init();

        var currentAllUserForms= []; //Forms of the current user
        var currentUser = null; //Current user is stored





        //event implementations

        function addForm(formName) {

            if (formName == null) {
                $scope.message = "Give a title to the form";
                return
            }

            else{

                var nform = {
                    "._id":null,
                    "title":formName,
                    "userId": null
                };
                FormService.createFormForUser(UserService.getCurrentUser()._id, nform)
                    .then(function(response){

                        if (response.data != null){
                            vm.form.formName = null;
                            init();
                        }

                    });
            }

        }

        function deleteForm(index) {

            FormService.deleteFormById(vm.forms[index]._id);
            init();
        }


        function selectForm(index) {
            vm.index = index;
            vm.form = vm.forms[index];
            vm.form.formName = vm.forms[index].title;

        }


        function updateForm(formName) {
            if(vm.index != -1 && formName != null){

                var selectedForm = vm.forms[vm.index];
                selectedForm.title = formName;
                FormService.updateFormById(selectedForm._id, selectedForm);
                init();
                vm.index = -1;
                vm.form.formName = null;
            }
        }

    }
})();
