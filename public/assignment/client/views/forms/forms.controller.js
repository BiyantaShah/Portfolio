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
        vm.goToFields = goToFields;

        vm.index = -1;
        var currentUser;
        var currentAllUserForms= []; //Forms of the current user

        function init() {
            currentUser = null;

            UserService.getCurrentUser()
                .then(function(response){
                    currentUser = response.data;

                    if(currentUser == null)
                    {
                        $location.path("/home");
                    }

                    else{
                        FormService.findAllFormsForUser(currentUser._id)
                            .then(function(response){
                                vm.forms = response.data;
                            });
                    }
                });

        }
        init();








        //event implementations

        function addForm(formName) {

            if (formName == null) {
                $scope.message = "Give a title to the form";
                return $scope.message;
            }

            else{

                var nform = {
                    "._id":null,
                    "title":formName,
                    "userId": null
                };
                FormService.createFormForUser(currentUser._id, nform)
                    .then(function(response){

                            vm.form.formName = null;
                            init();

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

        function goToFields(formId){
           // FormService.setFormId(formId);
            $location.path('/forms/' +formId+ '/field');
        }

    }
})();
