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

        function addForm(form) {

            if (form.formName == null) {
                $scope.message = "Give a title to the form";
                return $scope.message;
            }

            else{

                var newform = {
                    "title":form.formName,
                    "userId": currentUser._id,
                    "fields": []
                };
                FormService.createFormForUser(currentUser._id, newform)
                    .then(function(response){

                            vm.form.formName = null;
                            init();

                    });
            }

        }

        function deleteForm(index) {

            FormService.deleteFormById(vm.forms[index]._id)
            .then(function(response){
                if(response.data){
                    init();
                }
            });
        }


        function selectForm(index) {
            vm.index = index;
            vm.form = vm.forms[index];
            vm.form.formName = vm.forms[index].title;

        }


        function updateForm(form) {
            if(vm.index != -1 && form.formName != null){

                var selectedForm = vm.forms[vm.index];
                var updatedForm = {
                    "_id": selectedForm._id,
                    "userId": currentUser._id,
                    "title": form.formName,
                    "fields": selectedForm.fields,
                    "created": selectedForm.fields
                };
                FormService.updateFormById(selectedForm._id, updatedForm)
                    .then(function(response){
                        if(response.data){
                            //console.log(response.data);
                            vm.forms[vm.index] = response.data;
                            vm.form.formName = null;
                            vm.index = -1;

                            init();
                        }
                    });

            }
        }

        function goToFields(formId){
           // FormService.setFormId(formId);
            $location.path('/forms/' +formId+ '/field');
        }

    }
})();
